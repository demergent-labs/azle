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
        this.ok = true; // TODO determine this
        this.type = 'default'; // TODO determine this
        this.redirected = false; //TODO determine this
        this.bodyUsed = false; // TODO determine this
        this.status = init?.status ?? 200;
        this.statusText = init?.statusText ?? 'OK';
        this.headers = new AzleFetchHeaders(init?.headers);
        this.url = ''; // TODO where are we supposed to get this from?
    }

    async arrayBuffer(): Promise<ArrayBuffer> {
        if (this.body === null) {
            return new ArrayBuffer(0);
        }

        return (this.body as unknown as Uint8Array | Buffer).buffer;
    }

    async json(): Promise<string> {
        if (this.body === null) {
            return ''; // TODO is this correct?
        }

        return JSON.parse(
            (this.body as unknown as Uint8Array | Buffer).toString()
        );
    }

    async text(): Promise<string> {
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
