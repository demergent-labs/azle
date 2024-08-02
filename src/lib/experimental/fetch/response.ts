// TODO We currently do not have an implementation of ReadableStream
// TODO thus our body is done with Uint8Array or Buffer

import { AzleFetchHeaders } from './headers';

// Using Response from wasmedge-quickjs doesn't seem ideal for the time being
// It seems very tied to the low-level implementation at first glance
// We will build up our own response for the time being
export class AzleFetchResponse {
    url: Response['url'];
    ok: Response['ok'];
    type: Response['type'];
    redirected: Response['redirected'];
    status: Response['status'];
    statusText: Response['statusText'];
    headers: Response['headers'];
    body: Response['body'] = null;
    bodyUsed: Response['bodyUsed'];

    constructor(body?: BodyInit, init?: ResponseInit) {
        this.body = convertBodyInitToBody(body);
        this.status = init?.status ?? 200;
        this.statusText = getStatusText(this.status);
        this.ok = this.status >= 200 && this.status <= 299;
        this.type = '' as any; // TODO we should work to set this appropriately
        this.redirected = false; // TODO we are defaulting to false, I believe we would have to implement automatic redirects for this to ever be true
        this.bodyUsed = false;
        this.headers = new AzleFetchHeaders(init?.headers);
        this.url = ''; // TODO I do not understand how this is supposed to be set, as it is a readon-only property and the Respone constructor does not allow you to pass in the URL
    }

    async arrayBuffer(): Promise<ArrayBuffer> {
        this.bodyUsed = true;

        if (this.body === null) {
            return new ArrayBuffer(0);
        }

        return (this.body as unknown as Uint8Array | Buffer).buffer;
    }

    async json(): Promise<string> {
        this.bodyUsed = true;

        if (this.body === null) {
            return JSON.parse('');
        }

        return JSON.parse(
            (this.body as unknown as Uint8Array | Buffer).toString()
        );
    }

    async text(): Promise<string> {
        this.bodyUsed = true;

        if (this.body === null) {
            return '';
        }

        return (this.body as unknown as Uint8Array | Buffer).toString();
    }

    async blob(): Promise<Blob> {
        throw new Error(`AzleFetchResponse: blob is not yet implemented`);
    }

    async formData(): Promise<FormData> {
        throw new Error(`AzleFetchResponse: formData is not yet implemented`);
    }

    clone(): AzleFetchResponse {
        return new AzleFetchResponse();
    }
}

function convertBodyInitToBody(body?: BodyInit): Response['body'] {
    if (body === undefined) {
        return null;
    }

    if (body instanceof Uint8Array || body instanceof Buffer) {
        return Buffer.from(body) as unknown as Response['body'];
    }

    throw new Error(`AzleFetchResponse: body must be a Uint8Array or Buffer`);
}

function getStatusText(status: number): string {
    const statusTexts: {
        [key: number]: string;
    } = {
        100: 'Continue',
        101: 'Switching Protocols',
        102: 'Processing',
        103: 'Early Hints',
        200: 'OK',
        201: 'Created',
        202: 'Accepted',
        203: 'Non-Authoritative Information',
        204: 'No Content',
        205: 'Reset Content',
        206: 'Partial Content',
        207: 'Multi-Status',
        208: 'Already Reported',
        226: 'IM Used',
        300: 'Multiple Choices',
        301: 'Moved Permanently',
        302: 'Found',
        303: 'See Other',
        304: 'Not Modified',
        306: 'unused',
        307: 'Temporary Redirect',
        308: 'Permanent Redirect',
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
        406: 'Not Acceptable',
        407: 'Proxy Authentication Required',
        408: 'Request Timeout',
        409: 'Conflict',
        410: 'Gone',
        411: 'Length Required',
        412: 'Precondition Failed',
        413: 'Payload Too Large',
        414: 'URI Too Long',
        415: 'Unsupported Media Type',
        416: 'Range Not Satisfiable',
        417: 'Expectation Failed',
        418: "I'm a teapot",
        421: 'Misdirected Request',
        422: 'Unprocessable Content',
        423: 'Locked',
        424: 'Failed Dependency',
        426: 'Upgrade Required',
        428: 'Precondition Required',
        429: 'Too Many Requests',
        431: 'Request Header Fields Too Large',
        451: 'Unavailable For Legal Reasons',
        500: 'Internal Server Error',
        501: 'Not Implemented',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout',
        505: 'HTTP Version Not Supported',
        506: 'Variant Also Negotiates',
        507: 'Insufficient Storage',
        508: 'Loop Detected',
        510: 'Not Extended',
        511: 'Network Authentication Required'
    };

    return statusTexts[status] ?? '';
}
