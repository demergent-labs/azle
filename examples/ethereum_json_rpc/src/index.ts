import {
    Canister,
    ic,
    init,
    nat32,
    Principal,
    query,
    serialize,
    Some,
    StableBTreeMap,
    text,
    update
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

let stableStorage = StableBTreeMap<text, text>(0);

export default Canister({
    init: init([text], (ethereumUrl) => {
        stableStorage.insert('ethereumUrl', ethereumUrl);
    }),
    ethGetBalance: update([text], text, async (ethereumAddress) => {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt.Some;

        const azleArgs = [
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
                    function: [ic.id(), 'ethTransform'] as [Principal, string],
                    context: Uint8Array.from([])
                })
            }
        ];
        const agentArgs = [
            {
                url,
                max_response_bytes: [2_000n],
                method: {
                    post: null
                },
                headers: [],
                body: [
                    Buffer.from(
                        JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'eth_getBalance',
                            params: [ethereumAddress, 'earliest'],
                            id: 1
                        }),
                        'utf-8'
                    )
                ],
                transform: [
                    {
                        function: [ic.id(), 'ethTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    }
                ]
            }
        ];
        const cycles = 50_000_000n;

        const httpResponse = await getHttpResponse(azleArgs, agentArgs, cycles);

        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }),
    ethGetBlockByNumber: update([nat32], text, async (number) => {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt.Some;

        const azleArgs = [
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
                    function: [ic.id(), 'ethTransform'] as [Principal, string],
                    context: Uint8Array.from([])
                })
            }
        ];
        const agentArgs = [
            {
                url,
                max_response_bytes: [2_000n],
                method: {
                    post: null
                },
                headers: [],
                body: [
                    Buffer.from(
                        JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'eth_getBlockByNumber',
                            params: [`0x${number.toString(16)}`, false],
                            id: 1
                        }),
                        'utf-8'
                    )
                ],
                transform: [
                    {
                        function: [ic.id(), 'ethTransform'] as [
                            Principal,
                            string
                        ],
                        context: Uint8Array.from([])
                    }
                ]
            }
        ];
        const cycles = 50_000_000n;

        const httpResponse = await getHttpResponse(azleArgs, agentArgs, cycles);

        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }),
    ethTransform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});

async function getHttpResponse(azleArgs: any, agentArgs: any, cycles: bigint) {
    if (process.env.AZLE_TEST_FETCH === 'true') {
        const response = await fetch(`icp://aaaaa-aa/http_request`, {
            body: serialize({
                candidPath: '/candid/management.did',
                args: agentArgs,
                cycles
            })
        });
        const responseJson = await response.json();

        return responseJson;
    } else {
        return await ic.call(managementCanister.http_request, {
            args: azleArgs,
            cycles: 50_000_000n
        });
    }
}
