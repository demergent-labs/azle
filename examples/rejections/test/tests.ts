import { ok, Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/rejections/rejections.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    rejections_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'reject code NO_ERROR',
            test: async () => {
                const result =
                    await rejections_canister.get_rejection_code_no_error();
                return {
                    ok: 'NoError' in result
                };
            }
        },
        {
            name: 'reject code DESTINATION_INVALID',
            test: async () => {
                const result =
                    await rejections_canister.get_rejection_code_destination_invalid();
                return {
                    ok: 'DestinationInvalid' in result
                };
            }
        },
        {
            name: 'reject code CANISTER_REJECT',
            test: async () => {
                const result =
                    await rejections_canister.get_rejection_code_canister_reject();
                return {
                    ok: 'CanisterReject' in result
                };
            }
        },
        {
            name: 'reject code CANISTER_ERROR',
            test: async () => {
                const result =
                    await rejections_canister.get_rejection_code_canister_error();
                return {
                    ok: 'CanisterError' in result
                };
            }
        },
        {
            name: 'reject message',
            test: async () => {
                const rejection_message = 'custom rejection message';
                const result = await rejections_canister.get_rejection_message(
                    rejection_message
                );
                return {
                    ok: result === rejection_message
                };
            }
        }
        // {
        //     name: 'result with an accept',
        //     test: async () => {
        //         const rejectionMessage = 'custom rejection message';
        //         const result = await rejections_canister.getResult(
        //             { Accept: null },
        //             rejectionMessage
        //         );
        //         if (!ok(result)) {
        //             return {
        //                 err: result.err
        //             };
        //         }

        //         return {
        //             ok: result.ok === null
        //         };
        //     }
        // },
        // {
        //     name: 'result with an accept',
        //     test: async () => {
        //         const rejectionMessage = 'custom rejection message';

        //         const result = await rejections_canister.getResult(
        //             { Reject: null },
        //             rejectionMessage
        //         );

        //         if (ok(result)) {
        //             return {
        //                 ok: false
        //             };
        //         }

        //         return {
        //             ok: result.err === rejectionMessage
        //         };
        //     }
        // }
    ];
}
