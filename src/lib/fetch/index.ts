// TODO what happens if you have a bunch of fetches in your dependencies, all in a row?
// TODO how would you set options for each individually?
// TODO it seems like you might not be able to do that
// TODO we have got to get rid of the need to set all of these custom things

import { URL } from 'url';

import { fetchFile } from './file';
import { fetchHttp } from './http';
import { fetchIcp } from './icp';
import { getUrl } from './url';

export async function azleFetch(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    console.log('azleFetch 0');

    if (process.env.AZLE_TEST_FETCH === 'true') {
        console.log('azleFetch has been called');
    }

    const url = getUrl(input);

    console.log('azleFetch 1');

    if (url.protocol === 'file:') {
        return await fetchFile(input);
    }

    if (url.protocol === 'https:') {
        console.log('azleFetch 2');
        return await fetchHttp(input, init);
    }

    if (url.protocol === 'icp:') {
        return await fetchIcp(input, init);
    }

    throw new Error(`azleFetch: protocol ${url.protocol} not supported`);
}

export function serialize(param: {
    candidPath?: string;
    args?: any[];
    cycles?: number | bigint;
    cycles128?: number | bigint;
}): ArrayBuffer {
    return param as any;
}
