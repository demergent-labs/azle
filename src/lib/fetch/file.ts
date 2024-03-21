import { readFile } from 'fs/promises';

import { getUrl } from './url';

export async function fetchFile(input: RequestInfo | URL): Promise<Response> {
    const url = getUrl(input);

    const path = `${url.hostname}${url.pathname}`;
    const contents = await readFile(path);

    // Using Response from wasmedge-quickjs doesn't seem ideal for the time being
    // It seems very tied to the low-level implementation at first glance
    // We will build up our own response for the time being
    return {
        ok: true,
        arrayBuffer: async () => {
            return contents.buffer;
        },
        json: async () => {
            return JSON.parse(contents.toString());
        },
        text: async () => {
            return contents.toString();
        }
    } as any;
}
