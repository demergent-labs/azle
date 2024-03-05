import { serialize } from 'azle';

import { RpcSource } from '../globals';

export async function ethGetTransactionCount(address: string): Promise<number> {
    const jsonRpcArgs = {
        address,
        block: {
            Latest: null
        }
    };

    const response = await fetch(
        `icp://be2us-64aaa-aaaaa-qaabq-cai/eth_getTransactionCount`,
        {
            body: serialize({
                candidPath: '/src/candid/evm_rpc.did',
                args: [RpcSource, [], jsonRpcArgs],
                cycles: 1_000_000_000
            })
        }
    );
    const responseJson = await response.json();

    // TODO improve error handling
    return Number(responseJson.Consistent.Ok);
}
