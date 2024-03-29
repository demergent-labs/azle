// TODO what happens if you have a bunch of fetches in your dependencies, all in a row?
// TODO how would you set options for each individually?
// TODO it seems like you might not be able to do that
// TODO we have got to get rid of the need to set all of these custom things

import { fetchFile } from './file';
import { fetchHttp } from './http';
import { fetchIcp } from './icp';
import { getUrl } from './url';

export async function azleFetch(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response> {
    logWarnings(init);

    if (process.env.AZLE_TEST_FETCH === 'true') {
        console.log('azleFetch has been called');
    }

    const url = getUrl(input);

    if (url.protocol === 'file:') {
        return await fetchFile(input);
    }

    if (url.protocol === 'https:') {
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

function logWarnings(init?: RequestInit | undefined) {
    if (init === undefined) {
        return;
    }

    if (init.cache !== undefined) {
        logWarning(`cache`);
    }

    if (init.credentials !== undefined) {
        logWarning(`credentials`);
    }

    if (init.integrity !== undefined) {
        logWarning(`integrity`);
    }

    if (init.keepalive !== undefined) {
        logWarning(`keepalive`);
    }

    if (init.mode !== undefined) {
        logWarning(`mode`);
    }

    if (init.redirect !== undefined) {
        logWarning(`redirect`);
    }

    if (init.referrer !== undefined) {
        logWarning(`referrer`);
    }

    if (init.referrerPolicy !== undefined) {
        logWarning(`referrerPolicy`);
    }

    if (init.signal !== undefined) {
        logWarning(`signal`);
    }

    if (init.window !== undefined) {
        logWarning(`window`);
    }
}

function logWarning(method: string) {
    console.warn(
        `azleFetch: init.${method} has no effect when using an identity as the Authorization header`
    );
}
