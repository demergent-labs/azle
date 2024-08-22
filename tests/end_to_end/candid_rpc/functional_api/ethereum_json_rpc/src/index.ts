import {
    Canister,
    ic,
    init,
    nat32,
    Principal,
    query,
    Some,
    StableBTreeMap,
    text,
    update
} from 'azle/experimental';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/experimental/canisters/management';

let stableStorage = StableBTreeMap<text, text>(0);

export default Canister({
    init: init([text], (ethereumUrl) => {
        stableStorage.insert('ethereumUrl', ethereumUrl);
    }),
    ethGetBalance: update([text], text, async (ethereumAddress) => {
        const url = stableStorage.get('ethereumUrl');

        if (url === null) {
            throw new Error('ethereumUrl is not defined');
        }

        return await getBalance(url, ethereumAddress);
    }),
    ethGetBlockByNumber: update([nat32], text, async (number) => {
        const url = stableStorage.get('ethereumUrl');

        if (url === null) {
            throw new Error('ethereumUrl is not defined');
        }

        return await getBlockByNumber(url, number);
    }),
    ethTransform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});

async function getBalance(
    url: string,
    ethereumAddress: string
): Promise<string> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        ic.setOutgoingHttpOptions({
            maxResponseBytes: 2_000n,
            cycles: 50_000_000n,
            transformMethodName: 'ethTransform'
        });

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_getBalance',
                params: [ethereumAddress, 'earliest'],
                id: 1
            })
        });
        const responseText = await response.text();

        return responseText;
    } else {
        const httpResponse = await ic.call(managementCanister.http_request, {
            args: [
                {
                    url,
                    max_response_bytes: Some(2_000n),
                    method: {
                        post: null
                    },
                    headers: [],
                    body: Some(
                        Buffer.from(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBalance',
                                params: [ethereumAddress, 'earliest'],
                                id: 1
                            }),
                            'utf-8'
                        )
                    ),
                    transform: Some({
                        function: [ic.id(), 'ethTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    })
                }
            ],
            cycles: 50_000_000n
        });

        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }
}
async function getBlockByNumber(url: string, number: number): Promise<string> {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        ic.setOutgoingHttpOptions({
            maxResponseBytes: 2_000n,
            cycles: 50_000_000n,
            transformMethodName: 'ethTransform'
        });

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_getBlockByNumber',
                params: [`0x${number.toString(16)}`, false],
                id: 1
            })
        });
        const responseText = await response.text();

        return responseText;
    } else {
        const httpResponse = await ic.call(managementCanister.http_request, {
            args: [
                {
                    url,
                    max_response_bytes: Some(2_000n),
                    method: {
                        post: null
                    },
                    headers: [],
                    body: Some(
                        Buffer.from(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBlockByNumber',
                                params: [`0x${number.toString(16)}`, false],
                                id: 1
                            }),
                            'utf-8'
                        )
                    ),
                    transform: Some({
                        function: [ic.id(), 'ethTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    })
                }
            ],
            cycles: 50_000_000n
        });

        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }
}
