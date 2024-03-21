// TODO unfortunately this is highly unlikely to work in production because
// TODO of the headers...we need a good transform
// TODO what if the nodes automatically removed conflicting information?
// TODO for example, headers were removed if they weren't the same
// TODO it would be great if the minimum response could always come back
// TODO and then the response can say what was wrong, instead of an error

import { ethers } from 'ethers';

// TODO the default provider looks like it does multiple requests/responses!
// TODO it's basically the EVM RPC canister...I am not seeing the need for the EVM RPC canister...

// TODO add tests for different providers??
// TODO test different url configurations etc?
ethers.FetchRequest.registerGetUrl(async (fetchRequest) => {
    console.log('we tried to do a request but failed :(');
    console.log('fetchRequest.url', fetchRequest.url);
    console.log('fetchRequest.method', fetchRequest.method);
    console.log('fetchRequest.headers', Object.entries(fetchRequest.headers));
    console.log('fetchRequest.body.length', fetchRequest.body?.length);

    console.log(JSON.parse(Buffer.from(fetchRequest.body ?? '{}').toString()));

    try {
        const response = await fetch(fetchRequest.url, {
            method: fetchRequest.method,
            headers: Object.entries(fetchRequest.headers).map(
                ([key, value]) => {
                    return {
                        name: key,
                        value
                    };
                }
            ) as any,
            body: fetchRequest.body
        });

        console.log('response', response);

        console.log(await response.text());
        console.log(await response.json());

        const fetchResponse = new ethers.FetchResponse(
            response.status,
            'OK',
            {}, // TODO figure out headers
            new Uint8Array(await response.arrayBuffer()),
            fetchRequest
        );

        console.log('fetchResponse', fetchResponse);

        return fetchResponse;
    } catch (error) {
        console.log(error);

        return new ethers.FetchResponse(500, '', {}, null, fetchRequest);
    }
});
