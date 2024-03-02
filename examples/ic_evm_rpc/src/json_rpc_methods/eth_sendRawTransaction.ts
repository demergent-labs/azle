import { jsonStringify, serialize } from 'azle';
import { Express } from 'express';

export async function ethSendRawTransaction(
    rawTransaction: string
): Promise<any> {
    const response = await fetch(
        `icp://be2us-64aaa-aaaaa-qaabq-cai/eth_sendRawTransaction`,
        {
            body: serialize({
                candidPath: '/src/evm_rpc.did',
                args: [
                    {
                        EthSepolia: [
                            [
                                {
                                    Alchemy: null
                                },
                                {
                                    Ankr: null
                                }
                            ]
                        ]
                    },
                    [],
                    rawTransaction
                ],
                cycles: 1_000_000_000
            })
        }
    );
    const responseJson = await response.json();

    return responseJson;
}
