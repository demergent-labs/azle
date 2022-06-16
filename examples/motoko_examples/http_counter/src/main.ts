import { Update, Opt, nat16, Variant, Query, nat8, Func, ic } from 'azle';
import encodeUtf8 from 'encode-utf8';

type StreamingCallbackHttpResponse = {
    body: nat8[];
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
    body: nat8[];
    streaming_strategy: Opt<StreamingStrategy>;
    upgrade: Opt<boolean>;
};

type HttpRequest = {
    method: string;
    url: string;
    headers: HeaderField[];
    body: nat8[];
};

// Look at the stable examples
// TODO what is the stable keyword?
let counter = 0;

function isGzip(x: HeaderField) : boolean {
    return x[0].toLowerCase() === "accept-encoding" && x[1].toLowerCase().includes("gzip");
}

function encode(string: string): nat8[] {
    return Array.from(new Uint8Array(encodeUtf8(string)))
}

function gzipencode(string: string): nat8[] {
    return string.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? [];
}

export function http_request(req: HttpRequest) : Query<HttpResponse> {
    if (req.method === 'GET') {
        if (req.headers.find(isGzip) === undefined) {
            if (req.url === '/stream') {
                return {
                    status_code: 200,
                    headers: [ ['content-type', 'text/plain'] ],
                    body: encode('Counter'),
                    streaming_strategy: {
                        Callback: {
                            callback: (token: Token): Query<StreamingCallbackHttpResponse> => {
                                switch (token.arbitrary_data) {
                                    case 'start': {
                                        return {
                                            body: encode(" is "),
                                            token: {arbitrary_data: 'next'}
                                        }
                                    }
                                    case 'next': {
                                        return {
                                            body: encode(`${counter}`),
                                            token: {arbitrary_data: 'next'}
                                        }
                                    }
                                    case 'last': {
                                        return {
                                            body: encode(' streaming\n'),
                                            token: null
                                        }
                                    }
                                    default: {
                                        return ic.trap('unreachable');
                                    }
                                }
                            },
                            token: {
                                arbitrary_data: "start"
                            }
                        }
                    },
                    upgrade: null
                }
            }
            return {
                status_code: 200,
                headers: [ ['content-type', 'text/plain'] ],
                body: encode(`Counter is ${counter}\n${req.url}\n`),
                streaming_strategy: null,
                upgrade: null
            }
        }
        return {
            status_code: 200,
            headers: [ ['content-type', 'text/plain'], ['content-encoding', 'gzip'] ],
            body: gzipencode('\\1f\\8b\\08\\00\\98\\02\\1b\\62\\00\\03\\2b\\2c\\4d\\2d\\aa\\e4\\02\\00\\d6\\80\\2b\\05\\06\\00\\00\\00'),
            streaming_strategy: null,
            upgrade: null
        }
    }

    if (req.method === 'POST') {
        return {
            status_code: 204,
            headers: [],
            body: encode(''),
            streaming_strategy: null,
            upgrade: true
        }
    }

    return {
        status_code: 400,
        headers: [],
        body: encode('Invalid request'),
        streaming_strategy: null,
        upgrade: null
    }
}

export function http_request_update(req: HttpRequest): Update<HttpResponse> {
    if (req.method === 'POST') {
        if (req.headers.find(isGzip) === undefined) {
            counter += 1;
            return {
                status_code: 201,
                headers: [ ['content-type', 'text/plain'] ],
                body: encode(`Counter updated to ${counter}\n`),
                streaming_strategy: null,
                upgrade: null
            }
        }
        return {
            status_code: 201,
            headers: [ ['content-type', 'text/plain'], ['content-encoding', 'gzip'] ],
            body: gzipencode('\\1f\\8b\\08\\00\\37\\02\\1b\\62\\00\\03\\2b\\2d\\48\\49\\2c\\49\\e5\\02\\00\\a8\\da\\91\\6c\\07\\00\\00\\00'),
            streaming_strategy: null,
            upgrade: null
        }
    }

    return {
        status_code: 400,
        headers: [],
        body: encode('Invalid Request'),
        streaming_strategy: null,
        upgrade: null
    }
}

export function http_streaming(token: Token): Query<StreamingCallbackHttpResponse> {
    switch (token.arbitrary_data) {
        case 'start': {
            return {
                body: encode(" is "),
                token: {arbitrary_data: 'next'}
            }
        }
        case 'next': {
            return {
                body: encode(`${counter}`),
                token: {arbitrary_data: 'next'}
            }
        }
        case 'last': {
            return {
                body: encode(' streaming\n'),
                token: null
            }
        }
        default: {
            return ic.trap('unreachable');
        }
    }
}