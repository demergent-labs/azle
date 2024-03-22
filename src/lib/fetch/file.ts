import { readFile } from 'fs/promises';

import { getUrl } from './url';
import { AzleFetchResponse } from './response';

export async function fetchFile(input: RequestInfo | URL): Promise<Response> {
    const url = getUrl(input);

    const path = `${url.hostname}${url.pathname}`;
    const contents = await readFile(path);

    return new AzleFetchResponse(contents);
}
