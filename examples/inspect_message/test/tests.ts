import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/inspect_message/inspect_message.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    inspectMessageCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'calling `ic.acceptMessage` in inspectMessage',
            test: async () => {
                try {
                    const result = await inspectMessageCanister.accessible();
                    return {
                        Ok: result === true
                    };
                } catch (error) {
                    console.error(error);
                    return {
                        Ok: false
                    };
                }
            }
        },
        {
            name: 'not calling `ic.acceptMessage` in inspectMessage',
            test: async () => {
                try {
                    const result = await inspectMessageCanister.inaccessible();
                    return {
                        Ok: false
                    };
                } catch (error) {
                    return {
                        Ok: ((error as any).message as string).includes(
                            'IC0516'
                        )
                    };
                }
            }
        },
        {
            name: 'throwing in `inspectMessage`',
            test: async () => {
                try {
                    const result =
                        await inspectMessageCanister.alsoInaccessible();

                    return {
                        Ok: false
                    };
                } catch (error) {
                    return {
                        Ok: ((error as any).message as string).includes(
                            'IC0503'
                        )
                    };
                }
            }
        }
    ];
}
