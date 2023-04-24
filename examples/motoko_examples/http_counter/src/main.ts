import {
    blob,
    Func,
    Query,
    ic,
    match,
    nat,
    nat16,
    Opt,
    $query,
    Record,
    StableBTreeMap,
    Tuple,
    $update,
    Variant,
    Vec
} from 'azle';
import encodeUtf8 from 'encode-utf8';

type StreamingCallbackHttpResponse = Record<{
    body: blob;
    token: Opt<Token>;
}>;

type Token = Record<{
    // add whatever fields you'd like
    arbitrary_data: string;
}>;

type CallbackStrategy = Record<{
    callback: Callback;
    token: Token;
}>;

type Callback = Func<Query<(t: Token) => StreamingCallbackHttpResponse>>;

type StreamingStrategy = Variant<{
    Callback: CallbackStrategy;
}>;

type HeaderField = Tuple<[string, string]>;

type HttpResponse = Record<{
    status_code: nat16;
    headers: Vec<HeaderField>;
    body: blob;
    streaming_strategy: Opt<StreamingStrategy>;
    upgrade: Opt<boolean>;
}>;

type HttpRequest = Record<{
    method: string;
    url: string;
    headers: Vec<HeaderField>;
    body: blob;
}>;

let stableStorage = new StableBTreeMap<string, nat>(0, 25, 1_000);

stableStorage.insert('counter', 0n);

function isGzip(x: HeaderField): boolean {
    return (
        x[0].toLowerCase() === 'accept-encoding' &&
        x[1].toLowerCase().includes('gzip')
    );
}

function encode(string: string): blob {
    return new Uint8Array(encodeUtf8(string));
}

$query;
export function http_request(req: HttpRequest): HttpResponse {
    console.log('Hello from http_request');

    if (req.method === 'GET') {
        if (req.headers.find(isGzip) === undefined) {
            if (req.url === '/stream') {
                return {
                    status_code: 200,
                    headers: [['content-type', 'text/plain']],
                    body: encode('Counter'),
                    streaming_strategy: Opt.Some({
                        Callback: {
                            callback: [ic.id(), 'http_streaming'],
                            token: {
                                arbitrary_data: 'start'
                            }
                        }
                    }),
                    upgrade: Opt.Some(false)
                };
            }
            return {
                status_code: 200,
                headers: [['content-type', 'text/plain']],
                body: encode(
                    `Counter is ${match(stableStorage.get('counter'), {
                        Some: (x) => x,
                        None: () => 0n
                    })}\n${req.url}\n`
                ),
                streaming_strategy: Opt.None,
                upgrade: Opt.None
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
            streaming_strategy: Opt.None,
            upgrade: Opt.None
        };
    }

    if (req.method === 'POST') {
        return {
            status_code: 204,
            headers: [],
            body: encode(''),
            streaming_strategy: Opt.None,
            upgrade: Opt.Some(true)
        };
    }

    return {
        status_code: 400,
        headers: [],
        body: encode('Invalid request'),
        streaming_strategy: Opt.None,
        upgrade: Opt.None
    };
}

$update;
export function http_request_update(req: HttpRequest): HttpResponse {
    if (req.method === 'POST') {
        const counter = match(stableStorage.get('counter'), {
            Some: (x) => x,
            None: () => 0n
        });

        stableStorage.insert('counter', counter + 1n);

        if (req.headers.find(isGzip) === undefined) {
            return {
                status_code: 201,
                headers: [['content-type', 'text/plain']],
                body: encode(
                    `Counter updated to ${match(stableStorage.get('counter'), {
                        Some: (x) => x,
                        None: () => 0n
                    })}\n`
                ),
                streaming_strategy: Opt.None,
                upgrade: Opt.None
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
            streaming_strategy: Opt.None,
            upgrade: Opt.None
        };
    }

    return {
        status_code: 400,
        headers: [],
        body: encode('Invalid Request'),
        streaming_strategy: Opt.None,
        upgrade: Opt.None
    };
}

$query;
export function http_streaming(token: Token): StreamingCallbackHttpResponse {
    console.log('Hello from http_streaming');
    switch (token.arbitrary_data) {
        case 'start': {
            return {
                body: encode(' is '),
                token: Opt.Some({ arbitrary_data: 'next' })
            };
        }
        case 'next': {
            return {
                body: encode(
                    `${match(stableStorage.get('counter'), {
                        Some: (x) => x,
                        None: () => 0n
                    })}`
                ),
                token: Opt.Some({ arbitrary_data: 'last' })
            };
        }
        case 'last': {
            return {
                body: encode(' streaming\n'),
                token: Opt.None
            };
        }
        default: {
            return ic.trap('unreachable');
        }
    }
}
