import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/run_time_errors/run_time_errors.did';

const invalidPropertiesErrorMessage = `TypeError: Value is not of type 'Opt'
  [cause]: TypeError: Value must contain exactly one of the following properties: ['Some', 'None']`;

export function getInvalidOptTests(
    errorCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('return non object', async () => {
            await expect(errorCanister.returnNonObject).rejects.toThrow(
                "TypeError: Value is not of type 'Opt'"
            );
        });

        it('return object with both Some and None', async () => {
            await expect(errorCanister.returnBothSomeAndNone).rejects.toThrow(
                invalidPropertiesErrorMessage
            );
        });

        it('return object with neither Some nor None', async () => {
            await expect(
                errorCanister.returnObjectWithNeitherSomeNorNone
            ).rejects.toThrow(invalidPropertiesErrorMessage);
        });

        it('return object with non null None value', async () => {
            await expect(errorCanister.returnNonNullNone).rejects.toThrow(
                "TypeError: Value is not of type 'Opt'\n  [cause]: TypeError: Value is not of type 'null'"
            );
        });

        it('return object with invalid Some value', async () => {
            await expect(errorCanister.returnInvalidSomeValue).rejects.toThrow(
                "TypeError: Value is not of type 'Opt'\n  [cause]: TypeError: Value is not of type 'string'"
            );
        });
    };
}
