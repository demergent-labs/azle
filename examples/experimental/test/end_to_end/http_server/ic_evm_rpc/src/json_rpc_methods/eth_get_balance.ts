import { jsonRpcRequest } from './json_rpc_request';

export async function ethGetBalance(address: string): Promise<bigint> {
    const responseJson = await jsonRpcRequest({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1
    });

    const balance = BigInt(JSON.parse(responseJson.Ok).result);

    return balance;
}
