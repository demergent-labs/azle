import { serialize } from 'azle';

import { RpcSource } from '../globals';

export async function ethSendRawTransaction(
    rawTransaction: string
): Promise<any> {
    const response = await fetch(
        `icp://be2us-64aaa-aaaaa-qaabq-cai/eth_sendRawTransaction`,
        {
            body: serialize({
                candidPath: '/src/candid/evm_rpc.did',
                args: [RpcSource, [], rawTransaction],
                cycles: 1_000_000_000
            })
        }
    );
    const responseJson = await response.json();

    return responseJson;
}
