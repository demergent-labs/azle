import {
    blob,
    bool,
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

// TODO double-check all of these
export const Token = Record({
    // add whatever fields you'd like
    arbitrary_data: text
});

export const StreamingCallbackHttpResponse = Record({
    body: blob,
    token: Opt(Token)
});

export const Callback = Func([text], StreamingCallbackHttpResponse, 'query');

export const CallbackStrategy = Record({
    callback: Callback,
    token: Token
});

export const StreamingStrategy = Variant({
    Callback: CallbackStrategy
});

export type HeaderField = [text, text];
export const HeaderField = Tuple(text, text);

export const HttpResponse = Record({
    status_code: nat16,
    headers: Vec(HeaderField),
    body: blob,
    streaming_strategy: Opt(StreamingStrategy),
    upgrade: Opt(bool)
});

export const HttpRequest = Record({
    method: text,
    url: text,
    headers: Vec(HeaderField),
    body: blob,
    certificate_version: Opt(nat16)
});

globalThis._azleHttpResponse = HttpResponse;
globalThis._azleExportedIc = ic;

let server: NodeServer;

export function Server(serverInit: () => NodeServer) {
    return Canister({
        init: init([], () => {
            server = serverInit();
        }),
        postUpgrade: postUpgrade([], () => {
            server = serverInit();
        }),
        http_request: query(
            [HttpRequest],
            Manual(HttpResponse),
            async (httpRequest) => {
                await httpHandler(httpRequest, true);
            },
            {
                manual: true
            }
        ),
        http_request_update: update(
            [HttpRequest],
            Manual(HttpResponse),
            async (httpRequest) => {
                await httpHandler(httpRequest, false);
            },
            {
                manual: true
            }
        )
    });
}

export async function httpHandler(
    httpRequest: typeof HttpRequest.tsType,
    query: boolean
) {
    if (httpRequest.method === 'POST' && query === true) {
        ic.reply(
            {
                status_code: 204,
                headers: [],
                body: Uint8Array.from([]),
                streaming_strategy: None,
                upgrade: Some(true)
            },
            HttpResponse
        );

        return;
    }

    // TODO pull the socket class out into its own class
    const httpConn = new HttpConn(
        new (class {
            async read() {
                const httpLine1 = `${httpRequest.method} ${httpRequest.url} HTTP/1.1\r\n`;

                const httpHeaders = httpRequest.headers
                    .map((header) => {
                        return `${header[0]}: ${header[1]}`;
                    })
                    .join('\r\n');

                const httpString = `${httpLine1}${httpHeaders}\r\n\r\n`;

                return Buffer.concat([
                    Buffer.from(httpString),
                    httpRequest.body
                ]).buffer;
            }
        })()
    );

    const request = await httpConn.nextRequest();

    const req = new IncomingMessageForServer(request, httpConn);
    const res = new ServerResponse(httpConn);

    server.emit('request', req, res);
}
