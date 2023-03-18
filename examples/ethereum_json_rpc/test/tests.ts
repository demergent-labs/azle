import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/ethereum_json_rpc/ethereum_json_rpc.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    ethereumJsonRpcCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'ethGetBalance 0xeac0827eff0c6e3ff28a7d4a54f65cb7689d7b99',
            test: async () => {
                const result = await ethereumJsonRpcCanister.ethGetBalance(
                    '0xeac0827eff0c6e3ff28a7d4a54f65cb7689d7b99'
                );

                const resultJson = JSON.parse(result);

                return {
                    Ok: resultJson.result === '0x9ad9e69f9d47520000'
                };
            }
        },
        {
            name: 'ethGetBalance 0xf4b6cdcfcb24230b337d770df6034dfbd4e1503f',
            test: async () => {
                const result = await ethereumJsonRpcCanister.ethGetBalance(
                    '0xf4b6cdcfcb24230b337d770df6034dfbd4e1503f'
                );

                const resultJson = JSON.parse(result);

                return {
                    Ok: resultJson.result === '0x405fdf7e5af85e00000'
                };
            }
        },
        {
            name: 'ethGetBalance 0x7be2f7680c802da6154c92c0194ae732517a7169',
            test: async () => {
                const result = await ethereumJsonRpcCanister.ethGetBalance(
                    '0x7be2f7680c802da6154c92c0194ae732517a7169'
                );

                const resultJson = JSON.parse(result);

                return {
                    Ok: resultJson.result === '0xfc936392801c0000'
                };
            }
        },
        {
            name: 'ethGetBlockByNumber 0',
            test: async () => {
                const result =
                    await ethereumJsonRpcCanister.ethGetBlockByNumber(0);

                const resultJson = JSON.parse(result);

                return {
                    Ok:
                        resultJson.result.number ===
                        `0x${Number(0).toString(16)}`
                };
            }
        },
        {
            name: 'ethGetBlockByNumber 1',
            test: async () => {
                const result =
                    await ethereumJsonRpcCanister.ethGetBlockByNumber(1);

                const resultJson = JSON.parse(result);

                return {
                    Ok:
                        resultJson.result.number ===
                        `0x${Number(1).toString(16)}`
                };
            }
        },
        {
            name: 'ethGetBlockByNumber 2',
            test: async () => {
                const result =
                    await ethereumJsonRpcCanister.ethGetBlockByNumber(2);

                const resultJson = JSON.parse(result);

                return {
                    Ok:
                        resultJson.result.number ===
                        `0x${Number(2).toString(16)}`
                };
            }
        }
    ];
}
