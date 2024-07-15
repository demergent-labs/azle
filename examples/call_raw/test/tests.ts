import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
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
                100_000_000_000n
            );
            expect(result).toMatch('record');
            expect(result).toMatch('principal');
        });
    };
}
