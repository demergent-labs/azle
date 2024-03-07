import { jsonRpcRequest } from './json_rpc_request';

export async function ethMaxPriorityFeePerGas(): Promise<bigint> {
    const responseJson = await jsonRpcRequest({
        jsonrpc: '2.0',
        method: 'eth_maxPriorityFeePerGas',
        params: [],
        id: 1
    });

    const maxPriorityFeePerGas = BigInt(JSON.parse(responseJson.Ok).result);

    return maxPriorityFeePerGas;
}
