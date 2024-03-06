import { serialize } from 'azle';

import { RpcSource } from '../globals';

// TODO add static typing for Ethereum JSON RPC?
// TODO these types might exist somewhere
export async function ethFeeHistory(): Promise<any> {
    const jsonRpcArgs = {
        blockCount: 1,
        newestBlock: {
            Latest: null
        },
        rewardPercentiles: []
    };

    const response = await fetch(
        `icp://be2us-64aaa-aaaaa-qaabq-cai/eth_feeHistory`,
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
    return responseJson;
}
