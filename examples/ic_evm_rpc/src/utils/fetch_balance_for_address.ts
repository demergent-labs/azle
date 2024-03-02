import { serialize } from 'azle';

export async function fetchBalanceForAddress(address: string): Promise<bigint> {
    console.log('address', address);

    const response = await fetch(`icp://be2us-64aaa-aaaaa-qaabq-cai/request`, {
        body: serialize({
            candidPath: '/src/evm_rpc.did',
            args: [
                {
                    // TODO figure out why JsonRpcSource and RpcSource are different
                    // TODO Is this coming to consensus amongst multiple providers?
                    Chain: 11_155_111 // Sepolia
                },
                JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getBalance',
                    params: [address, 'latest'],
                    id: 1
                }),
                1_000 // TODO what is this for?
            ],
            cycles: 1_000_000_000
        })
    });

    const responseJson = await response.json();

    const balance = BigInt(JSON.parse(responseJson.Ok).result);

    return balance;
}
