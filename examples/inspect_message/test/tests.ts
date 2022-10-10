import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/inspect_message/inspect_message.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    inspect_message_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'calling `ic.accept_message` in inspectMessage',
            test: async () => {
                try {
                    const result = await inspect_message_canister.accessible();
                    return {
                        ok: result === true
                    };
                } catch (error) {
                    console.error(error);
                    return {
                        ok: false
                    };
                }
            }
        },
        {
            name: 'not calling `ic.accept_message` in inspectMessage',
            test: async () => {
                try {
                    const result =
                        await inspect_message_canister.inaccessible();
                    return {
                        ok: false
                    };
                } catch (error) {
                    return {
                        ok: ((error as any).message as string).includes(
                            'Code: 403'
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
                        await inspect_message_canister.alsoInaccessible();

                    return {
                        ok: false
                    };
                } catch (error) {
                    return {
                        ok: ((error as any).message as string).includes(
                            'Code: 500'
                        )
                    };
                }
            }
        }
    ];
}
