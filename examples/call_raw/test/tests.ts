import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, Test } from 'azle/test/jest';

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

            if ('Err' in result) {
                throw new Error(result.Err);
            }

            expect(result).toHaveProperty('Ok');
            expect(result.Ok).toMatch('blob');
        });

        it('calls create_canister via execute_call_raw', async () => {
            const result = await call_raw_canister.executeCallRaw(
                Principal.fromText('aaaaa-aa'),
                'create_canister',
                '(record { settings = null })',
                100_000_000_000n
            );

            if ('Err' in result) {
                throw new Error(result.Err);
            }

            expect(result.Ok).toMatch('record');
            expect(result.Ok).toMatch('principal');
        });

        it('calls raw_rand via execute_call_raw128', async () => {
            const result = await call_raw_canister.executeCallRaw128(
                Principal.fromText('aaaaa-aa'),
                'raw_rand',
                '()',
                0n
            );

            if ('Err' in result) {
                throw new Error(result.Err);
            }

            expect(result.Ok).toMatch('blob');
        });

        it('calls create_canister via execute_call_raw128', async () => {
            const result = await call_raw_canister.executeCallRaw128(
                Principal.fromText('aaaaa-aa'),
                'create_canister',
                '(record { settings = null })',
                100_000_000_000n
            );

            if ('Err' in result) {
                throw new Error(result.Err);
            }

            expect(result.Ok).toMatch('record');
            expect(result.Ok).toMatch('principal');
        });
    };
}
