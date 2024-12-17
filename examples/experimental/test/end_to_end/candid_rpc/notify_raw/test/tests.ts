import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';

export function getTests(
    canister1: ActorSubclass<CANISTER1_SERVICE>,
    canister2: ActorSubclass<CANISTER2_SERVICE>
): Test {
    return () => {
        it('check notification before', async () => {
            const result = await canister2.getNotified();

            expect(result).toBe(false);
        });

        it('send notification', async () => {
            await canister1.sendNotification();

            await new Promise((resolve) => setTimeout(resolve, 5000));

            expect(true).toBe(true);
        });

        it('check notification after', async () => {
            const result = await canister2.getNotified();

            expect(result).toBe(true);
        });
    };
}
