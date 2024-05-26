import { ActorSubclass } from '@dfinity/agent';
import { fail, Test, test } from 'azle/test';

import { _SERVICE } from './dfx_generated/inspect_message/inspect_message.did';

export function getTests(
    inspectMessageCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'calling `ic.acceptMessage` in inspectMessage',
            test: async () => {
                try {
                    const result = await inspectMessageCanister.accessible();

                    return test(result);
                } catch (error) {
                    console.error(error);
                    return fail();
                }
            }
        },
        {
            name: 'not calling `ic.acceptMessage` in inspectMessage',
            test: async () => {
                try {
                    await inspectMessageCanister.inaccessible();

                    return fail();
                } catch (error: any) {
                    return test(error.message.includes('IC0406'));
                }
            }
        },
        {
            name: 'throwing in `inspectMessage`',
            test: async () => {
                try {
                    await inspectMessageCanister.alsoInaccessible();

                    return fail();
                } catch (error: any) {
                    return test(error.message.includes('IC0503'));
                }
            }
        }
    ];
}
