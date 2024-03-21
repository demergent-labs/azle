import { readFile } from 'fs/promises';

import { getUrl } from './url';

export async function fetchFile(input: RequestInfo | URL): Promise<Response> {
    const url = getUrl(input);

    const path = `${url.hostname}${url.pathname}`;
    const contents = await readFile(path);

    // TODO can we use Response from wasmedge-quickjs?
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
