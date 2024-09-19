import {
    call,
    id,
    IDL,
    init,
    Principal,
    query,
    StableBTreeMap,
    update
} from 'azle';
import {
    http_request_args,
    http_request_result,
    http_transform_args
} from 'azle/canisters/management';

export default class {
    stableStorage = StableBTreeMap<string, string>(0);

    @init([IDL.Text])
    init(ethereumUrl: string): void {
        this.stableStorage.insert('ethereumUrl', ethereumUrl);
    }

    @update([IDL.Text], IDL.Text)
    async ethGetBalance(ethereumAddress: string): Promise<string> {
        const url = this.stableStorage.get('ethereumUrl');

        if (url === null) {
            throw new Error('ethereumUrl is not defined');
        }

        return await getBalance(url, ethereumAddress);
    }

    @update([IDL.Nat32], IDL.Text)
    async ethGetBlockByNumber(number: number): Promise<string> {
        const urlOpt = this.stableStorage.get('ethereumUrl');

        if (urlOpt === null) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt;

        return await getBlockByNumber(url, number);
    }

    @query([http_transform_args], http_request_result)
    ethTransform(args: http_transform_args): http_request_result {
        return {
            ...args.response,
            headers: []
        };
    }
}

async function getBalance(
    url: string,
    ethereumAddress: string
): Promise<string> {
    const httpResponse = await call<[http_request_args], http_request_result>(
        Principal.fromText('aaaaa-aa'),
        'http_request',
        {
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
                        new TextEncoder().encode(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBalance',
                                params: [ethereumAddress, 'earliest'],
                                id: 1
                            })
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
            payment: 50_000_000n
        }
    );

    return new TextDecoder().decode(Uint8Array.from(httpResponse.body));
}
async function getBlockByNumber(url: string, number: number): Promise<string> {
    const httpResponse = await call<http_request_args[], http_request_result>(
        Principal.fromText('aaaaa-aa'),
        'http_request',
        {
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
                        new TextEncoder().encode(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBlockByNumber',
                                params: [`0x${number.toString(16)}`, false],
                                id: 1
                            })
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
            payment: 50_000_000n
        }
    );

    return new TextDecoder().decode(Uint8Array.from(httpResponse.body));
}
