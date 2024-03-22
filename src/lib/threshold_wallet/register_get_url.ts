// TODO unfortunately this is highly unlikely to work in production because
// TODO of the headers...we need a good transform
// TODO what if the nodes automatically removed conflicting information?
// TODO for example, headers were removed if they weren't the same
// TODO it would be great if the minimum response could always come back
// TODO and then the response can say what was wrong, instead of an error
// TODO what if the developer installs a different version of ethers?
// TODO should we use a peer dependency?

import { ethers } from 'ethers';

export async function ethersGetUrl(
    fetchRequest: ethers.FetchRequest
): Promise<ethers.FetchResponse> {
    const response = await fetch(fetchRequest.url, {
        method: fetchRequest.method,
        headers: fetchRequest.headers,
        body: fetchRequest.body
    });

    const fetchResponse = new ethers.FetchResponse(
        response.status,
        response.statusText,
        Array.from(response.headers.entries()).reduce((acc, [key, value]) => {
            return {
                ...acc,
                [key]: value
            };
        }, {}),
        new Uint8Array(await response.arrayBuffer()),
        fetchRequest
    );

    return fetchResponse;
}
