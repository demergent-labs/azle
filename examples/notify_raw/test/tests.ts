import { ActorSubclass } from '@dfinity/agent';
import { error, succeed, Test, testEquality } from 'azle/test';

import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';

export function getTests(
    canister1: ActorSubclass<CANISTER1_SERVICE>,
    canister2: ActorSubclass<CANISTER2_SERVICE>
): Test[] {
    return [
        {
            name: 'check notification before',
            test: async () => {
                const result = await canister2.getNotified();

                return testEquality(result, false);
            }
        },
        {
            name: 'send notification',
            test: async () => {
                try {
                    await canister1.sendNotification();

                    await new Promise((resolve) => setTimeout(resolve, 5000));

                    return succeed();
                } catch (e: any) {
                    return error(e);
                }
            }
        },
        {
            name: 'check notification after',
            test: async () => {
                const result = await canister2.getNotified();

                return testEquality(result, true);
            }
        }
    ];
}
