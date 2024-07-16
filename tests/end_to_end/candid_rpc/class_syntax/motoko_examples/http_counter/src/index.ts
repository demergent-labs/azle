import {
    id,
    IDL,
    init,
    Principal,
    query,
    StableBTreeMap,
    trap,
    update
} from 'azle';

export type HeaderField = [string, string];
export const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);

export const HttpRequest = IDL.Record({
    method: IDL.Text,
    url: IDL.Text,
    headers: IDL.Vec(HeaderField),
    body: IDL.Vec(IDL.Nat8),
    certificate_version: IDL.Opt(IDL.Nat16)
});
export type HttpRequest = {
    method: string;
    url: string;
    headers: HeaderField[];
    body: Uint8Array;
    certificate_version: [number] | [];
};

export const HttpUpdateRequest = IDL.Record({
    method: IDL.Text,
    url: IDL.Text,
    headers: IDL.Vec(HeaderField),
    body: IDL.Vec(IDL.Nat8)
});
export type HttpUpdateRequest = {
    method: string;
    url: string;
    headers: HeaderField[];
    body: Uint8Array;
};

const Token = IDL.Record({
    // add whatever fields you'd like
    arbitrary_data: IDL.Text
});
type Token = {
    arbitrary_data: string;
};

export const StreamingCallbackHttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    token: IDL.Opt(Token)
});
export type StreamingCallbackHttpResponse = {
    body: Uint8Array;
    token: [Token] | [];
};

const Callback = IDL.Func(
    [Token],
    [IDL.Opt(StreamingCallbackHttpResponse)],
    ['query']
);
type Callback = [Principal, string];

export const CallbackStrategy = IDL.Record({
    callback: Callback,
    token: Token
});
export type CallbackStrategy = {
    callback: Callback;
    token: Token;
};

export const StreamingStrategy = IDL.Variant({
    Callback: CallbackStrategy
});

export type StreamingStrategy = {
    Callback: CallbackStrategy;
};

export const HttpResponse = IDL.Record({
    status_code: IDL.Nat16,
    headers: IDL.Vec(HeaderField),
    body: IDL.Vec(IDL.Nat8),
    upgrade: IDL.Opt(IDL.Bool),
    streaming_strategy: IDL.Opt(StreamingStrategy)
});

export type HttpResponse = {
    status_code: number;
    headers: HeaderField[];
    body: Uint8Array;
    upgrade: [boolean] | [];
    streaming_strategy: [StreamingStrategy] | [];
};

let stableStorage = StableBTreeMap<string, bigint>(0);

export default class {
    @init([])
    init(): void {
        stableStorage.insert('counter', 0n);
    }

    @query([HttpRequest], HttpResponse)
    http_request(req: HttpRequest): HttpResponse {
        if (req.method === 'GET') {
            if (req.headers.find(isGzip) === undefined) {
                if (req.url === '/stream') {
                    return {
                        status_code: 200,
                        headers: [['content-type', 'text/plain']],
                        body: encode('Counter'),
                        streaming_strategy: [
                            {
                                Callback: {
                                    callback: [id(), 'http_streaming'],
                                    token: {
                                        arbitrary_data: 'start'
                                    }
                                }
                            }
                        ],
                        upgrade: [false]
                    };
                }

                const counter = stableStorage.get('counter');

                if (counter === null) {
                    trap('counter does not exist');
                }

                return {
                    status_code: 200,
                    headers: [['content-type', 'text/plain']],
                    body: encode(`Counter is ${counter}\n${req.url}\n`),
                    streaming_strategy: [],
                    upgrade: []
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
                streaming_strategy: [],
                upgrade: []
            };
        }

        if (req.method === 'POST') {
            return {
                status_code: 204,
                headers: [],
                body: encode(''),
                streaming_strategy: [],
                upgrade: [true]
            };
        }

        return {
            status_code: 400,
            headers: [],
            body: encode('Invalid request'),
            streaming_strategy: [],
            upgrade: []
        };
    }

    @update([HttpRequest], HttpResponse)
    http_request_update(req: HttpRequest): HttpResponse {
        if (req.method === 'POST') {
            const counterOpt = stableStorage.get('counter');
            const counter =
                counterOpt === null
                    ? trap('counter does not exist')
                    : counterOpt;

            stableStorage.insert('counter', counter + 1n);

            if (req.headers.find(isGzip) === undefined) {
                const counterOpt = stableStorage.get('counter');
                const counter =
                    counterOpt === null
                        ? trap('counter does not exist')
                        : counterOpt;

                return {
                    status_code: 201,
                    headers: [['content-type', 'text/plain']],
                    body: encode(`Counter updated to ${counter}\n`),
                    streaming_strategy: [],
                    upgrade: []
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
                streaming_strategy: [],
                upgrade: []
            };
        }

        return {
            status_code: 400,
            headers: [],
            body: encode('Invalid Request'),
            streaming_strategy: [],
            upgrade: []
        };
    }

    @query([Token], StreamingCallbackHttpResponse)
    http_streaming(token: Token): StreamingCallbackHttpResponse {
        switch (token.arbitrary_data) {
            case 'start': {
                return {
                    body: encode(' is '),
                    token: [{ arbitrary_data: 'next' }]
                };
            }
            case 'next': {
                const counterOpt = stableStorage.get('counter');
                const counter =
                    counterOpt === null
                        ? trap('counter does not exist')
                        : counterOpt;

                return {
                    body: encode(`${counter}`),
                    token: [{ arbitrary_data: 'last' }]
                };
            }
            case 'last': {
                return {
                    body: encode(' streaming\n'),
                    token: []
                };
            }
            default: {
                return trap('unreachable');
            }
        }
    }
}

function isGzip(x: HeaderField): boolean {
    return (
        x[0].toLowerCase() === 'accept-encoding' &&
        x[1].toLowerCase().includes('gzip')
    );
}

function encode(string: string): Uint8Array {
    return Buffer.from(string, 'utf-8');
}
