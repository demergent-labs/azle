import { call, id } from 'azle';
import {
    http_request_args,
    http_request_result
} from 'azle/canisters/management';
import {
    Canister,
    ic,
    init,
    nat32,
    Principal,
    query,
    StableBTreeMap,
    text,
    update
} from 'azle/experimental';
import {
    HttpResponse,
    HttpTransformArgs
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
        const httpResponse = await call<
            [http_request_args],
            http_request_result
        >('aaaaa-aa', 'http_request', {
            paramIdlTypes: [http_request_args],
            returnIdlType: http_request_result,
            args: [
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
                            function: [id(), 'ethTransform'] as [
                                Principal,
                                string
                            ],
                            context: Uint8Array.from([])
                        }
                    ]
                }
            ],
            cycles: 50_000_000n
        });

        return Buffer.from(httpResponse.body).toString('utf-8');
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
        const httpResponse = await call<
            [http_request_args],
            http_request_result
        >('aaaaa-aa', 'http_request', {
            paramIdlTypes: [http_request_args],
            returnIdlType: http_request_result,
            args: [
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
                            function: [id(), 'ethTransform'] as [
                                Principal,
                                string
                            ],
                            context: Uint8Array.from([])
                        }
                    ]
                }
            ],
            cycles: 50_000_000n
        });

        return Buffer.from(httpResponse.body).toString('utf-8');
    }
}
