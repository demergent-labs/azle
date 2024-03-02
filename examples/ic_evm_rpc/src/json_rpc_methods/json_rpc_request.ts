import { serialize } from 'azle';

import { JsonRpcSource } from '../globals';

export async function jsonRpcRequest(body: string): Promise<any> {
    const response = await fetch(`icp://be2us-64aaa-aaaaa-qaabq-cai/request`, {
        body: serialize({
            candidPath: '/src/candid/evm_rpc.did',
            args: [
                JsonRpcSource,
                body,
                1_000 // TODO what is this for?
            ],
            cycles: 1_000_000_000
        })
    });
    const responseJson = await response.json();

    return responseJson;
}
