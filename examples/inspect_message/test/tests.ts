import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/inspect_message/inspect_message.did';

export function getTests(
    inspectMessageCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('calls `ic.acceptMessage` in inspectMessage', async () => {
            const result = await inspectMessageCanister.accessible();
            expect(result).toBe(true);
        });

        it('rejects because `ic.acceptMessage` was not called in inspectMessage', async () => {
            await expect(inspectMessageCanister.inaccessible()).rejects.toThrow(
                /IC0406/
            );
        });

        it('rejects because `inspectMessage` threw', async () => {
            await expect(
                inspectMessageCanister.alsoInaccessible()
            ).rejects.toThrow(/IC0503/);
        });
    };
}
