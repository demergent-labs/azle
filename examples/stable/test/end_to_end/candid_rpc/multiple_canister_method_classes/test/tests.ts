import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/multiple_canister_method_classes/multiple_canister_method_classes.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('calls raw rand via execute_call_raw', async () => {
            const result = await canister.executeCallRaw(
                Principal.fromText('aaaaa-aa'),
                'raw_rand',
                '()',
                0n
            );

            expect(result).toMatch('blob');
        });

        it('calls create_canister via execute_call_raw', async () => {
            const result = await canister.executeCallRaw(
                Principal.fromText('aaaaa-aa'),
                'create_canister',
                '(record { settings = null })',
                100_000_000_000n
            );
            expect(result).toMatch('record');
            expect(result).toMatch('principal');
        });
    };
}
