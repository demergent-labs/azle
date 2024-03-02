import { jsonRpcRequest } from './json_rpc_request';

export async function ethGasPrice(): Promise<bigint> {
    const responseJson = await jsonRpcRequest(
        JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_gasPrice',
            params: [],
            id: 1
        })
    );

    const gasPrice = BigInt(JSON.parse(responseJson.Ok).result);

    return gasPrice;
}
