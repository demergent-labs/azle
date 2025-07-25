import '#experimental/lib/assert_experimental';

import { Server as NodeServer, ServerResponse } from 'http';
// @ts-ignore
import { HttpConn } from 'http';
// @ts-ignore
import { IncomingMessageForServer } from 'http';
// @ts-ignore
import httpMessageParser from 'http-message-parser';

import {
    HttpRequest,
    HttpResponse,
    HttpUpdateRequest
} from '#lib/canisters/http_gateway/idl/index';
import { idlDecode, idlEncode } from '#lib/execute_and_reply_with_candid_serde';
import { msgArgData, msgReply } from '#lib/ic_apis/index';
import { query, update } from '#lib/index';

export class Server {
    nodeServer?: NodeServer;

    @query([HttpRequest], HttpResponse, { composite: true, manual: true })
    async http_request(): Promise<void> {
        const httpRequest = idlDecode(
            [HttpRequest],
            msgArgData()
        )[0] as unknown as HttpRequest;

        if (this.nodeServer === undefined) {
            throw new Error(
                'The nodeServer property of the Server base class has not been set.'
            );
        }

        await httpHandler(this.nodeServer, httpRequest, true);
    }

    @update([HttpUpdateRequest], HttpResponse, { manual: true })
    async http_request_update(): Promise<void> {
        const httpUpdateRequest = idlDecode(
            [HttpUpdateRequest],
            msgArgData()
        )[0] as unknown as HttpUpdateRequest;

        if (this.nodeServer === undefined) {
            throw new Error(
                'The nodeServer property of the Server base class has not been set.'
            );
        }

        await httpHandler(this.nodeServer, httpUpdateRequest, false);
    }
}

export async function httpHandler(
    nodeServer: NodeServer,
    httpRequest: HttpRequest | HttpUpdateRequest,
    query: boolean
): Promise<void> {
    if (shouldUpgrade(httpRequest, query)) {
        const encoded = idlEncode(
            [HttpResponse],
            [
                {
                    status_code: 204,
                    headers: [],
                    body: Uint8Array.from([]),
                    streaming_strategy: [],
                    upgrade: [true]
                }
            ]
        );

        msgReply(encoded);

        return;
    }

    // TODO we should probably do the full try socket more in Rust
    class AzleSocket {
        responseData = Buffer.from([]);
        readable = true;
        writeable = true;
        res: ServerResponse | null = null;

        async read(): Promise<ArrayBuffer> {
            const httpLine1 = `${httpRequest.method} ${httpRequest.url} HTTP/1.1\r\n`;

            const httpHeaders = httpRequest.headers
                .map((header) => {
                    return `${header[0]}: ${header[1]}`;
                })
                .join('\r\n');

            const httpString = `${httpLine1}${httpHeaders}\r\n\r\n`;

            return Buffer.concat([
                Buffer.from(httpString),
                new Uint8Array(httpRequest.body)
            ]).buffer;
        }

        async write(data: any): Promise<void> {
            if (data.byteLength !== undefined) {
                this.responseData = Buffer.concat([
                    this.responseData,
                    Buffer.from(data)
                ]);

                return;
            }

            if (typeof data === 'string') {
                this.responseData = Buffer.concat([
                    this.responseData,
                    Buffer.from(data)
                ]);

                return;
            }

            // TODO I am not sure if this works
            // TODO I did what I remember Rust doing
            // TODO which is to just turn the object into a string
            if (typeof data === 'object') {
                this.responseData = Buffer.concat([
                    this.responseData,
                    Buffer.from(data.toString())
                ]);
                return;
            }
        }

        end(_data: any): void {
            const startIndex =
                this.responseData.indexOf(Buffer.from('\r\n\r\n')) + 4;

            const parsedHttpResponse = httpMessageParser(
                this.responseData.slice(0, startIndex)
            );

            const isChunked = Object.keys(parsedHttpResponse.headers)
                .map((key) => key.toLowerCase())
                .includes('transfer-encoding');

            const slicedBody = this.responseData.slice(startIndex);

            const unchunkedBody = isChunked
                ? processChunkedBody(slicedBody)
                : slicedBody;

            if (this.res === null) {
                throw new Error('res must be defined');
            }

            // TODO should we be using parsedHttpResponse.headers or this.res.getHeaders()?
            // TODO this.res.getHeaders() seems to be missing some headers like Transfer-Encoding
            // TODO also Express in Node has more headers like Date, Connection, Keep-Alive
            // TODO Conection and Keep-Alive might just not make sense in our context
            const encoded = idlEncode(
                [HttpResponse],
                [
                    {
                        status_code: this.res.statusCode,
                        headers: Object.entries(this.res.getHeaders())
                            .map((entry) => entry)
                            .filter((header) => {
                                // TODO it seems the ic proxy always wants to put its own content-length
                                // TODO and having either of these headers causes issues
                                // TODO we are essentially disabling transfer-encoding and thus the ability
                                // TODO to do a chunked encoding
                                return (
                                    header[0].toLowerCase() !==
                                        'content-length' &&
                                    header[0].toLowerCase() !==
                                        'transfer-encoding'
                                );
                            }),
                        body: new Uint8Array(unchunkedBody),
                        streaming_strategy: [],
                        upgrade: []
                    }
                ]
            );

            msgReply(encoded);
        }
    }

    const azleSocket = new AzleSocket();

    const httpConn = new HttpConn(azleSocket);

    const request = await httpConn.nextRequest();

    const req = new IncomingMessageForServer(request, httpConn);
    const res = new ServerResponse(httpConn);

    azleSocket.res = res;

    nodeServer.emit('request', req, res);
}

function shouldUpgrade(
    httpRequest: HttpRequest | HttpUpdateRequest,
    query: boolean
): boolean {
    const forceQueryHeaderExists = forceHeaderExists(
        'X-Ic-Force-Query',
        httpRequest.headers
    );

    const forceUpdateHeaderExists = forceHeaderExists(
        'X-Ic-Force-Update',
        httpRequest.headers
    );

    return (
        query === true &&
        !forceQueryHeaderExists &&
        (httpRequest.method === 'POST' ||
            httpRequest.method === 'PUT' ||
            httpRequest.method === 'PATCH' ||
            httpRequest.method === 'DELETE' ||
            forceUpdateHeaderExists)
    );
}

function forceHeaderExists(
    headerName: string,
    headers: [string, string][]
): boolean {
    return (
        headers.find(
            ([key, value]) =>
                key.toLowerCase() === headerName.toLowerCase() &&
                value === 'true'
        ) !== undefined
    );
}

// TODO I think this is correct but it is expensive
// TODO we really just want the icx-proxy or boundary node to not
// TODO automatically apply the Content-Length header
// TODO we should open up an issue to get the icx-proxy to allow chunked transfer encodings
// TODO and to not mess with the content-length header if it is already set
function processChunkedBody(buffer: Buffer): Buffer {
    let result = Buffer.alloc(0);
    let remaining = buffer;

    while (remaining.length > 0) {
        const sizeEnd = remaining.indexOf('\r\n');
        if (sizeEnd === -1) {
            throw new Error('Invalid chunked body: missing size line end');
        }

        const sizeLine = remaining.slice(0, sizeEnd).toString();
        const chunkSize = parseInt(sizeLine, 16);

        if (chunkSize === 0) {
            break; // End of chunks
        }

        const chunkStart = sizeEnd + 2; // skip CRLF
        const chunkEnd = chunkStart + chunkSize;

        if (chunkEnd > remaining.length) {
            throw new Error('Invalid chunked body: incomplete chunk');
        }

        const chunk = remaining.slice(chunkStart, chunkEnd);
        result = Buffer.concat([result, chunk]);

        remaining = remaining.slice(chunkEnd + 2); // skip chunk data and trailing CRLF
    }

    return result;
}
