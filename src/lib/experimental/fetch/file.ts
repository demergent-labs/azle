import '../experimental';

import { readFile } from 'fs/promises';

import { AzleFetchResponse } from './response';
import { getUrl } from './url';

export async function fetchFile(input: RequestInfo | URL): Promise<Response> {
    const url = getUrl(input);

    const path = `${url.hostname}${url.pathname}`;
    const contents = await readFile(path);

    return new AzleFetchResponse(contents);
}
