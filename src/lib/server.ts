import {
    blob,
    bool,
    CandidType,
    Canister,
    Func,
    ic,
    init,
    Manual,
    nat16,
    None,
    Opt,
    postUpgrade,
    query,
    Record,
    Some,
    text,
    Tuple,
    update,
    Variant,
    Vec
} from '.';
import { ServerResponse, Server as NodeServer } from 'http';
// @ts-ignore
import { HttpConn } from 'http';
// @ts-ignore
import { IncomingMessageForServer } from 'http';
import { CanisterOptions } from './candid/types/reference/service/canister_function';

const httpMessageParser = require('http-message-parser');

export type HeaderField = [text, text];
export const HeaderField = Tuple(text, text);

export const HttpRequest = Record({
    method: text,
    url: text,
    headers: Vec(HeaderField),
    body: blob,
    certificate_version: Opt(nat16)
});
export type HttpRequest = typeof HttpRequest.tsType;

export const HttpUpdateRequest = Record({
    method: text,
    url: text,
    headers: Vec(HeaderField),
    body: blob
});
export type HttpUpdateRequest = typeof HttpUpdateRequest.tsType;

export const DefaultToken = blob;
export function StreamingCallbackHttpResponse<Token extends CandidType>(
    token: Token
) {
    return Record({
        body: blob,
        token: Opt(token)
    });
}
export type StreamingCallbackHttpResponse<Token> = {
    body: Uint8Array;
    token: Opt<Token>;
};

function Callback<Token extends CandidType>(token: Token) {
    return Func([token], Opt(StreamingCallbackHttpResponse(token)), 'query');
}
type Callback = Func;

export function CallbackStrategy<Token extends CandidType>(token: Token) {
    return Record({
        callback: Callback(token),
        token
    });
}
export type CallbackStrategy<Token> = {
    callback: Callback;
    token: Token;
};

export function StreamingStrategy<Token extends CandidType>(token: Token) {
    return Variant({
        Callback: CallbackStrategy(token)
    });
}

export type StreamingStrategy<Token> = Variant<{
    Callback: CallbackStrategy<Token>;
}>;

export function HttpResponse<Token extends CandidType>(token?: Token) {
    return Record({
        status_code: nat16,
        headers: Vec(HeaderField),
        body: blob,
        upgrade: Opt(bool),
        streaming_strategy: Opt(StreamingStrategy(token ?? DefaultToken))
    });
}
export type HttpResponse<Token> = {
    status_code: number;
    headers: HeaderField[];
    body: Uint8Array;
    upgrade: Opt<boolean>;
    streaming_strategy: Opt<StreamingStrategy<Token>>;
};

let nodeServer: NodeServer | undefined = undefined;

type ServerCallback = () => NodeServer | Promise<NodeServer>;

export function serverInit(serverCallback: ServerCallback) {
    return init([], async () => {
        nodeServer = await serverCallback();
    });
}

export function serverPostUpgrade(serverCallback: ServerCallback) {
    return postUpgrade([], async () => {
        nodeServer = await serverCallback();
    });
}

export const serverHttpRequest = query(
    [HttpRequest],
    Manual(HttpResponse()),
    async (httpRequest) => {
        await httpHandler(httpRequest, true);
    },
    {
        manual: true
    }
);

export const serverHttpRequestUpdate = update(
    [HttpUpdateRequest],
    Manual(HttpResponse()),
    async (httpRequest) => {
        await httpHandler(httpRequest, false);
    },
    {
        manual: true
    }
);

export function serverCanisterMethods(serverCallback: ServerCallback) {
    return {
        init: serverInit(serverCallback),
        postUpgrade: serverPostUpgrade(serverCallback),
        http_request: serverHttpRequest,
        http_request_update: serverHttpRequestUpdate
    };
}

export function Server<T extends CanisterOptions>(
    serverCallback: ServerCallback,
    canisterOptions?: T
) {
    return Canister({
        ...serverCanisterMethods(serverCallback),
        ...canisterOptions
    });
}

export async function httpHandler(
    httpRequest: HttpRequest | HttpUpdateRequest,
    query: boolean
) {
    if (nodeServer === undefined) {
        throw new Error(`The server was not initialized`);
    }

    if (shouldUpgrade(httpRequest, query)) {
        ic.reply(
            {
                status_code: 204,
                headers: [],
                body: Uint8Array.from([]),
                streaming_strategy: None,
                upgrade: Some(true)
            },
            HttpResponse()
        );

        return;
    }

    // TODO we should probably do the full try socket more in Rust
    class AzleSocket {
        responseData = Buffer.from([]);
        readable = true;
        writeable = true;
        res: ServerResponse | null = null;

        async read() {
            const httpLine1 = `${httpRequest.method} ${httpRequest.url} HTTP/1.1\r\n`;

            const httpHeaders = httpRequest.headers
                .map((header) => {
                    return `${header[0]}: ${header[1]}`;
                })
                .join('\r\n');

            const httpString = `${httpLine1}${httpHeaders}\r\n\r\n`;

            return Buffer.concat([Buffer.from(httpString), httpRequest.body])
                .buffer;
        }

        async write(data: any) {
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

        end(data: any) {
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
            ic.reply(
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
                                header[0].toLowerCase() !== 'content-length' &&
                                header[0].toLowerCase() !== 'transfer-encoding'
                            );
                        }),
                    body: new Uint8Array(unchunkedBody),
                    streaming_strategy: {
                        None: null
                    },
                    upgrade: {
                        None: null
                    }
                },
                HttpResponse()
            );
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

export function setNodeServer(newNodeServer: NodeServer) {
    nodeServer = newNodeServer;
}
