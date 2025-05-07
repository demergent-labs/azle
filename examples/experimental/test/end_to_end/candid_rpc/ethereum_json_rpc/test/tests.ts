import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/_internal/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/ethereum_json_rpc/ethereum_json_rpc.did';

export function getTests(
    ethereumJsonRpcCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('executes `ethGetBalance 0xddf5810a0eb2fb2e32323bb2c99509ab320f24ac` from a canister', async () => {
            const result = await ethereumJsonRpcCanister.ethGetBalance(
                '0xddf5810a0eb2fb2e32323bb2c99509ab320f24ac'
            );

            const resultJson = JSON.parse(result);

            expect(resultJson.result).toBe('0x1d5e1b3a1096ed20');
        });

        it('executes `ethGetBalance 0xc951900c341abbb3bafbf7ee2029377071dbc36a` from a canister', async () => {
            const result = await ethereumJsonRpcCanister.ethGetBalance(
                '0xc951900c341abbb3bafbf7ee2029377071dbc36a'
            );

            const resultJson = JSON.parse(result);

            expect(resultJson.result).toBe('0x26c95ea9f5baa58');
        });

        it('executes `ethGetBalance 0x7e7f18a02eccaa5d61ab8fbf030343c434a25ef7` from a canister', async () => {
            const result = await ethereumJsonRpcCanister.ethGetBalance(
                '0x7e7f18a02eccaa5d61ab8fbf030343c434a25ef7'
            );

            const resultJson = JSON.parse(result);

            expect(resultJson.result).toBe('0x39fbae8d042dd0000');
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
