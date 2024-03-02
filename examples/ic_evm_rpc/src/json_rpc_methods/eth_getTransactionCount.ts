import { jsonStringify, serialize } from 'azle';
import { Express } from 'express';

export async function ethGetTransactionCount(address: string): Promise<bigint> {
    const response = await fetch(
        `icp://be2us-64aaa-aaaaa-qaabq-cai/eth_getTransactionCount`,
        {
            body: serialize({
                candidPath: '/src/evm_rpc.did',
                args: [
                    {
                        EthSepolia: [
                            [
                                // {
                                //     Alchemy: null
                                // },
                                {
                                    Ankr: null
                                }
                            ]
                        ]
                    },
                    [],
                    {
                        address,
                        block: {
                            Latest: null
                        }
                    }
                ],
                cycles: 1_000_000_000
            })
        }
    );
    const responseJson = await response.json();

    console.log('get transaction count responseJson', responseJson);

    // TODO improve error handling
    return responseJson.Consistent.Ok;
}
