import {
    blob,
    bool,
    Canister,
    Func,
    ic,
    init,
    nat,
    nat16,
    None,
    Opt,
    query,
    Record,
    Some,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Variant,
    Vec
} from 'azle';

const Token = Record({
    // add whatever fields you'd like
    arbitrary_data: text
});

const StreamingCallbackHttpResponse = Record({
    body: blob,
    token: Opt(Token)
});

export const Callback = Func([text], StreamingCallbackHttpResponse, 'query');

const CallbackStrategy = Record({
    callback: Callback,
    token: Token
});

const StreamingStrategy = Variant({
    Callback: CallbackStrategy
});

type HeaderField = [text, text];
const HeaderField = Tuple(text, text);

const HttpResponse = Record({
    status_code: nat16,
    headers: Vec(HeaderField),
    body: blob,
    streaming_strategy: Opt(StreamingStrategy),
    upgrade: Opt(bool)
});

const HttpRequest = Record({
    method: text,
    url: text,
    headers: Vec(HeaderField),
    body: blob,
    certificate_version: Opt(nat16)
});

let stableStorage = StableBTreeMap(text, nat, 0);

export default Canister({
    init: init([], () => {
        stableStorage.insert('counter', 0n);
    }),
    http_request: query([HttpRequest], HttpResponse, (req) => {
        console.log('Hello from http_request');

        if (req.method === 'GET') {
            if (req.headers.find(isGzip) === undefined) {
                if (req.url === '/stream') {
                    return {
                        status_code: 200,
                        headers: [['content-type', 'text/plain']],
                        body: encode('Counter'),
                        streaming_strategy: Some({
                            Callback: {
                                callback: [ic.id(), 'http_streaming'],
                                token: {
                                    arbitrary_data: 'start'
                                }
                            }
                        }),
                        upgrade: Some(false)
                    };
                }

                const counterOpt = stableStorage.get('counter');
                const counter =
                    'None' in counterOpt
                        ? ic.trap('counter does not exist')
                        : counterOpt.Some;

                return {
                    status_code: 200,
                    headers: [['content-type', 'text/plain']],
                    body: encode(`Counter is ${counter}\n${req.url}\n`),
                    streaming_strategy: None,
                    upgrade: None
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
                    31, 139, 8, 0, 152, 2, 27, 98, 0, 3, 43, 44, 77, 45, 170,
                    228, 2, 0, 214, 128, 43, 5, 6, 0, 0, 0
                ]),
                streaming_strategy: None,
                upgrade: None
            };
        }

        if (req.method === 'POST') {
            return {
                status_code: 204,
                headers: [],
                body: encode(''),
                streaming_strategy: None,
                upgrade: Some(true)
            };
        }

        return {
            status_code: 400,
            headers: [],
            body: encode('Invalid request'),
            streaming_strategy: None,
            upgrade: None
        };
    }),
    http_request_update: update([HttpRequest], HttpResponse, (req) => {
        if (req.method === 'POST') {
            const counterOpt = stableStorage.get('counter');
            const counter =
                'None' in counterOpt
                    ? ic.trap('counter does not exist')
                    : counterOpt.Some;

            stableStorage.insert('counter', counter + 1n);

            if (req.headers.find(isGzip) === undefined) {
                const counterOpt = stableStorage.get('counter');
                const counter =
                    'None' in counterOpt
                        ? ic.trap('counter does not exist')
                        : counterOpt.Some;

                return {
                    status_code: 201,
                    headers: [['content-type', 'text/plain']],
                    body: encode(`Counter updated to ${counter}\n`),
                    streaming_strategy: None,
                    upgrade: None
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
                    31, 139, 8, 0, 55, 2, 27, 98, 0, 3, 43, 45, 72, 73, 44, 73,
                    229, 2, 0, 168, 218, 145, 108, 7, 0, 0, 0
                ]),
                streaming_strategy: None,
                upgrade: None
            };
        }

        return {
            status_code: 400,
            headers: [],
            body: encode('Invalid Request'),
            streaming_strategy: None,
            upgrade: None
        };
    }),
    http_streaming: query([Token], StreamingCallbackHttpResponse, (token) => {
        console.log('Hello from http_streaming');
        switch (token.arbitrary_data) {
            case 'start': {
                return {
                    body: encode(' is '),
                    token: Some({ arbitrary_data: 'next' })
                };
            }
            case 'next': {
                const counterOpt = stableStorage.get('counter');
                const counter =
                    'None' in counterOpt
                        ? ic.trap('counter does not exist')
                        : counterOpt.Some;

                return {
                    body: encode(`${counter}`),
                    token: Some({ arbitrary_data: 'last' })
                };
            }
            case 'last': {
                return {
                    body: encode(' streaming\n'),
                    token: None
                };
            }
            default: {
                return ic.trap('unreachable');
            }
        }
    })
});

function isGzip(x: HeaderField): boolean {
    return (
        x[0].toLowerCase() === 'accept-encoding' &&
        x[1].toLowerCase().includes('gzip')
    );
}

function encode(string: string): blob {
    return Buffer.from(string, 'utf-8');
}
