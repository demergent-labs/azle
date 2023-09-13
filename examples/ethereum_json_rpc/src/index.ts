import {
    ic,
    init,
    nat32,
    query,
    Service,
    StableBTreeMap,
    text,
    update
} from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

export default class extends Service {
    stableStorage = new StableBTreeMap<text, text>(text, text, 0);

    @init([text])
    init(ethereumUrl: text) {
        this.stableStorage.insert('ethereumUrl', ethereumUrl);
    }

    @update([text], text)
    async ethGetBalance(ethereumAddress: string): Promise<string> {
        const urlOpt = this.stableStorage.get('ethereumUrl');

        if (urlOpt.length === 0) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt[0];

        const httpResponse = await ic.call(managementCanister.http_request, {
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
                            function: [ic.id(), 'ethTransform'],
                            context: Uint8Array.from([])
                        }
                    ]
                }
            ],
            cycles: 50_000_000n
        });

        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }

    @update([nat32], text)
    async ethGetBlockByNumber(number: nat32): Promise<string> {
        const urlOpt = this.stableStorage.get('ethereumUrl');

        if (urlOpt.length === 0) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt[0];

        const httpResponse = await ic.call(managementCanister.http_request, {
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
                            function: [ic.id(), 'ethTransform'],
                            context: Uint8Array.from([])
                        }
                    ]
                }
            ],
            cycles: 50_000_000n
        });

        return Buffer.from(httpResponse.body.buffer).toString('utf-8');
    }

    @query([HttpTransformArgs], HttpResponse)
    ethTransform(args: HttpTransformArgs): HttpResponse {
        return {
            ...args.response,
            headers: []
        };
    }
}
