import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/ethereum_json_rpc/ethereum_json_rpc.did';

export function getTests(
    ethereumJsonRpcCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('executes `ethGetBalance 0xeac0827eff0c6e3ff28a7d4a54f65cb7689d7b99` from a canister', async () => {
            const result = await ethereumJsonRpcCanister.ethGetBalance(
                '0xeac0827eff0c6e3ff28a7d4a54f65cb7689d7b99'
            );

            const resultJson = JSON.parse(result);

            expect(resultJson.result).toBe('0x9ad9e69f9d47520000');
        });

        it('executes `ethGetBalance 0xf4b6cdcfcb24230b337d770df6034dfbd4e1503f` from a canister', async () => {
            const result = await ethereumJsonRpcCanister.ethGetBalance(
                '0xf4b6cdcfcb24230b337d770df6034dfbd4e1503f'
            );

            const resultJson = JSON.parse(result);

            expect(resultJson.result).toBe('0x405fdf7e5af85e00000');
        });

        it('executes `ethGetBalance 0x7be2f7680c802da6154c92c0194ae732517a7169` from a canister', async () => {
            const result = await ethereumJsonRpcCanister.ethGetBalance(
                '0x7be2f7680c802da6154c92c0194ae732517a7169'
            );

            const resultJson = JSON.parse(result);

            expect(resultJson.result).toBe('0xfc936392801c0000');
        });

        it('executes `ethGetBlockByNumber 0` from a canister', async () => {
            const result = await ethereumJsonRpcCanister.ethGetBlockByNumber(0);

            const resultJson = JSON.parse(result);

            expect(resultJson.result.number).toBe(
                `0x${Number(0).toString(16)}`
            );
        });

        it('executes `ethGetBlockByNumber 1` from a canister', async () => {
            const result = await ethereumJsonRpcCanister.ethGetBlockByNumber(1);

            const resultJson = JSON.parse(result);

            expect(resultJson.result.number).toBe(
                `0x${Number(1).toString(16)}`
            );
        });

        it('executes `ethGetBlockByNumber 2` from a canister', async () => {
            const result = await ethereumJsonRpcCanister.ethGetBlockByNumber(2);

            const resultJson = JSON.parse(result);

            expect(resultJson.result.number).toBe(
                `0x${Number(2).toString(16)}`
            );
        });
    };
}
