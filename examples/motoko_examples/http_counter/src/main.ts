import {
    Func,
    Query,
    Stable,
    Opt,
    Update,
    Variant,
    blob,
    ic,
    nat,
    nat16
} from 'azle';
import encodeUtf8 from 'encode-utf8';

type StreamingCallbackHttpResponse = {
    body: blob;
    token: Opt<Token>;
};

type Token = {
    // add whatever fields you'd like
    arbitrary_data: string;
};

type CallbackStrategy = {
    callback: Callback;
    token: Token;
};

type Callback = Func<(t: Token) => Query<StreamingCallbackHttpResponse>>;

type StreamingStrategy = Variant<{
    Callback: CallbackStrategy;
}>;

type HeaderField = [string, string];

type HttpResponse = {
    status_code: nat16;
    headers: HeaderField[];
    body: blob;
    streaming_strategy: Opt<StreamingStrategy>;
    upgrade: Opt<boolean>;
};

type HttpRequest = {
    method: string;
    url: string;
    headers: HeaderField[];
    body: blob;
};

let counter: Stable<nat> = 0n;

function isGzip(x: HeaderField): boolean {
    return (
        x[0].toLowerCase() === 'accept-encoding' &&
        x[1].toLowerCase().includes('gzip')
    );
}

function encode(string: string): blob {
    return new Uint8Array(encodeUtf8(string));
}

export function http_request(req: HttpRequest): Query<HttpResponse> {
    console.log('Hello from http_request');

    if (req.method === 'GET') {
        if (req.headers.find(isGzip) === undefined) {
            if (req.url === '/stream') {
                return {
                    status_code: 200,
                    headers: [['content-type', 'text/plain']],
                    body: encode('Counter'),
                    streaming_strategy: {
                        Callback: {
                            callback: [ic.id(), 'http_streaming'],
                            token: {
                                arbitrary_data: 'start'
                            }
                        }
                    },
                    upgrade: false
                };
            }
            return {
                status_code: 200,
                headers: [['content-type', 'text/plain']],
                body: encode(`Counter is ${counter}\n${req.url}\n`),
                streaming_strategy: null,
                upgrade: null
            };
        }
        return {
            status_code: 200,
            headers: [
                ['content-type', 'text/plain'],
                ['content-encoding', 'gzip']
            ],
            // TODO Currently there is an issue with azle being able to process
            // the above string from the motoko example. The work around is to
            // convert the above hex values to nat8 values manually and the
            // result is the array below. (for example 0x1f is 31, 0x8b is
            // 139, etc)
            // body: '\1f\8b\08\00\98\02\1b\62\00\03\2b\2c\4d\2d\aa\e4\02\00\d6\80\2b\05\06\00\00\00',
            body: Uint8Array.from([
                31, 139, 8, 0, 152, 2, 27, 98, 0, 3, 43, 44, 77, 45, 170, 228,
                2, 0, 214, 128, 43, 5, 6, 0, 0, 0
            ]),
            streaming_strategy: null,
            upgrade: null
        };
    }

    if (req.method === 'POST') {
        return {
            status_code: 204,
            headers: [],
            body: encode(''),
            streaming_strategy: null,
            upgrade: true
        };
    }

    return {
        status_code: 400,
        headers: [],
        body: encode('Invalid request'),
        streaming_strategy: null,
        upgrade: null
    };
}

export function http_request_update(req: HttpRequest): Update<HttpResponse> {
    if (req.method === 'POST') {
        counter += 1n;

        if (req.headers.find(isGzip) === undefined) {
            return {
                status_code: 201,
                headers: [['content-type', 'text/plain']],
                body: encode(`Counter updated to ${counter}\n`),
                streaming_strategy: null,
                upgrade: null
            };
        }
        return {
            status_code: 201,
            headers: [
                ['content-type', 'text/plain'],
                ['content-encoding', 'gzip']
            ],
            // TODO Currently there is an issue with azle being able to process
            // the above string from the motoko example. The work around is to
            // convert the above hex values to nat8 values manually and the
            // result is the array below. (for example 0x1f is 31, 0x8b is
            // 139, etc)
            // body: '\1f\8b\08\00\37\02\1b\62\00\03\2b\2d\48\49\2c\49\e5\02\00\a8\da\91\6c\07\00\00\00'),
            body: Uint8Array.from([
                31, 139, 8, 0, 55, 2, 27, 98, 0, 3, 43, 45, 72, 73, 44, 73, 229,
                2, 0, 168, 218, 145, 108, 7, 0, 0, 0
            ]),
            streaming_strategy: null,
            upgrade: null
        };
    }

    return {
        status_code: 400,
        headers: [],
        body: encode('Invalid Request'),
        streaming_strategy: null,
        upgrade: null
    };
}

export function http_streaming(
    token: Token
): Query<StreamingCallbackHttpResponse> {
    console.log('Hello from http_streaming');
    switch (token.arbitrary_data) {
        case 'start': {
            return {
                body: encode(' is '),
                token: { arbitrary_data: 'next' }
            };
        }
        case 'next': {
            return {
                body: encode(`${counter}`),
                token: { arbitrary_data: 'last' }
            };
        }
        case 'last': {
            return {
                body: encode(' streaming\n'),
                token: null
            };
        }
        default: {
            return ic.trap('unreachable');
        }
    }
}
