import { ActorSubclass } from '@icp-sdk/core/agent';
import { Principal } from '@icp-sdk/core/principal';
import { expect, it, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/call_raw/call_raw.did';

export function getTests(call_raw_canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('calls raw rand via execute_call_raw', async () => {
            const result = await call_raw_canister.executeCallRaw(
                Principal.fromText('aaaaa-aa'),
                'raw_rand',
                '()',
                0n
            );

            expect(result).toMatch('blob');
        });

        it('calls create_canister via execute_call_raw', async () => {
            const result = await call_raw_canister.executeCallRaw(
                Principal.fromText('aaaaa-aa'),
                'create_canister',
                '(record { settings = null })',
                500_000_000_000n
            );
            expect(result).toMatch('record');
            expect(result).toMatch('principal');
        });
    };
}
