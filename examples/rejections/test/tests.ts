import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/rejections/rejections.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(rejectionsCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'reject code NO_ERROR',
            test: async () => {
                const result =
                    await rejectionsCanister.getRejectionCodeNoError();
                return {
                    Ok: 'NoError' in result
                };
            }
        },
        {
            name: 'reject code DESTINATION_INVALID',
            test: async () => {
                const result =
                    await rejectionsCanister.getRejectionCodeDestinationInvalid();
                return {
                    Ok: 'DestinationInvalid' in result
                };
            }
        },
        {
            name: 'reject code CANISTER_REJECT',
            test: async () => {
                const result =
                    await rejectionsCanister.getRejectionCodeCanisterReject();
                return {
                    Ok: 'CanisterReject' in result
                };
            }
        },
        {
            name: 'reject code CANISTER_ERROR',
            test: async () => {
                const result =
                    await rejectionsCanister.getRejectionCodeCanisterError();
                return {
                    Ok: 'CanisterError' in result
                };
            }
        },
        {
            name: 'reject message',
            test: async () => {
                const rejectionMessage = 'custom rejection message';
                const result = await rejectionsCanister.getRejectionMessage(
                    rejectionMessage
                );
                return {
                    Ok: result === rejectionMessage
                };
            }
        }
        // {
        //     name: 'result with an accept',
        //     test: async () => {
        //         const rejectionMessage = 'custom rejection message';
        //         const result = await rejectionsCanister.getResult(
        //             { Accept: null },
        //             rejectionMessage
        //         );
        //         if (!ok(result)) {
        //             return {
        //                 err: result.err
        //             };
        //         }

        //         return {
        //             Ok: result.ok === null
        //         };
        //     }
        // },
        // {
        //     name: 'result with an accept',
        //     test: async () => {
        //         const rejectionMessage = 'custom rejection message';

        //         const result = await rejectionsCanister.getResult(
        //             { Reject: null },
        //             rejectionMessage
        //         );

        //         if (ok(result)) {
        //             return {
        //                 Ok: false
        //             };
        //         }

        //         return {
        //             Ok: result.err === rejectionMessage
        //         };
        //     }
        // }
    ];
}
