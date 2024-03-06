import { serialize } from 'azle';

import { JsonRpcSource } from '../globals';

export async function jsonRpcRequest(body: Record<string, any>): Promise<any> {
    const response = await fetch(`icp://be2us-64aaa-aaaaa-qaabq-cai/request`, {
        body: serialize({
            candidPath: '/src/candid/evm_rpc.did',
            args: [JsonRpcSource, JSON.stringify(body), 1_000],
            cycles: 1_000_000_000
        })
    });
    const responseJson = await response.json();

    return responseJson;
}
