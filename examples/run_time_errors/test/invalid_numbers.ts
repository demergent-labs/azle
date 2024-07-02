import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

export function getInvalidNumberTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        // TODO: change this to "TypeError: Value is not of type 'number'"
        // See https://github.com/demergent-labs/azle/issues/1108
        it.skip('return invalid number', async () => {
            await expect(errorCanister.returnInvalidNumber).rejects.toThrow(
                "TypeError: Value is not of type 'float64'"
            );
        });

        it('return invalid int', async () => {
            await expect(errorCanister.returnInvalidInt).rejects.toThrow(
                "TypeError: Value is not of type 'int'"
            );
        });

        it('return invalid int8', async () => {
            await expect(errorCanister.returnInvalidInt8).rejects.toThrow(
                "TypeError: Value is not of type 'int8'"
            );
        });

        it('return invalid int16', async () => {
            await expect(errorCanister.returnInvalidInt16).rejects.toThrow(
                "TypeError: Value is not of type 'int16'"
            );
        });

        it('return invalid int32', async () => {
            await expect(errorCanister.returnInvalidInt32).rejects.toThrow(
                "TypeError: Value is not of type 'int32'"
            );
        });

        it('return invalid int64', async () => {
            await expect(errorCanister.returnInvalidInt64).rejects.toThrow(
                "TypeError: Value is not of type 'int64'"
            );
        });

        it('return invalid nat', async () => {
            await expect(errorCanister.returnInvalidNat).rejects.toThrow(
                "TypeError: Value is not of type 'nat'"
            );
        });

        it('return invalid nat8', async () => {
            await expect(errorCanister.returnInvalidNat8).rejects.toThrow(
                "TypeError: Value is not of type 'nat8'"
            );
        });

        it('return invalid nat16', async () => {
            await expect(errorCanister.returnInvalidNat16).rejects.toThrow(
                "TypeError: Value is not of type 'nat16'"
            );
        });

        it('return invalid nat32', async () => {
            await expect(errorCanister.returnInvalidNat32).rejects.toThrow(
                "TypeError: Value is not of type 'nat32'"
            );
        });

        it('return invalid nat64', async () => {
            await expect(errorCanister.returnInvalidNat64).rejects.toThrow(
                "TypeError: Value is not of type 'nat64'"
            );
        });

        it('return invalid float32', async () => {
            await expect(errorCanister.returnInvalidFloat32).rejects.toThrow(
                "TypeError: Value is not of type 'float32'"
            );
        });

        it('return invalid float64', async () => {
            await expect(errorCanister.returnInvalidFloat64).rejects.toThrow(
                "TypeError: Value is not of type 'float64'"
            );
        });
    };
}
