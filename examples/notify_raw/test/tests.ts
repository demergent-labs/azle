import { ok, Test } from 'azle/test';
import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    canister1: ActorSubclass<CANISTER1_SERVICE>,
    canister2: ActorSubclass<CANISTER2_SERVICE>
): Test[] {
    return [
        {
            name: 'check notification before',
            test: async () => {
                const result = await canister2.get_notified();

                return {
                    ok: result === false
                };
            }
        },
        {
            name: 'send notification',
            test: async () => {
                const result = await canister1.send_notification();

                await new Promise((resolve) => setTimeout(resolve, 5000));

                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: true
                };
            }
        },
        {
            name: 'check notification after',
            test: async () => {
                const result = await canister2.get_notified();

                return {
                    ok: result === true
                };
            }
        }
    ];
}
