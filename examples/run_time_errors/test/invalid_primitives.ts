import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

export function getInvalidPrimitiveTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('return invalid boolean value', async () => {
            await expect(
                errorCanister.returnInvalidBooleanValue
            ).rejects.toThrow("TypeError: Value is not of type 'boolean'");
        });

        it('return invalid empty value', async () => {
            await expect(errorCanister.returnInvalidEmptyValue).rejects.toThrow(
                "TypeError: Value cannot be converted into type 'empty'"
            );
        });

        it('return invalid null value', async () => {
            await expect(errorCanister.returnInvalidNullValue).rejects.toThrow(
                "TypeError: Value is not of type 'null'"
            );
        });

        it('return invalid string value', async () => {
            await expect(
                errorCanister.returnInvalidStringValue
            ).rejects.toThrow("TypeError: Value is not of type 'string'");
        });

        // TODO: Consider saying "Value is not of type 'text'"
        // See https://github.com/demergent-labs/azle/issues/1108
        it.skip('return invalid text value', async () => {
            await expect(errorCanister.returnInvalidTextValue).rejects.toThrow(
                "TypeError: Value is not of type 'string'"
            );
        });

        it('return invalid void value', async () => {
            await expect(errorCanister.returnInvalidVoidValue).rejects.toThrow(
                "TypeError: Value is not of type 'void'"
            );
        });

        it('return invalid void alias value', async () => {
            await expect(
                errorCanister.returnInvalidVoidAliasValue
            ).rejects.toThrow("TypeError: Value is not of type 'void'");
        });

        it('return invalid null alias value', async () => {
            await expect(
                errorCanister.returnInvalidNullAliasValue
            ).rejects.toThrow("TypeError: Value is not of type 'null'");
        });
    };
}
