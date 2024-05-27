import { ActorSubclass } from '@dfinity/agent';
import { Test, test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/rejections/rejections.did';

export function getTests(rejectionsCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'reject code NO_ERROR',
            test: async () => {
                const result =
                    await rejectionsCanister.getRejectionCodeNoError();
                return test('NoError' in result);
            }
        },
        {
            name: 'reject code DESTINATION_INVALID',
            test: async () => {
                const result =
                    await rejectionsCanister.getRejectionCodeDestinationInvalid();
                return test('DestinationInvalid' in result);
            }
        },
        {
            name: 'reject code CANISTER_REJECT',
            test: async () => {
                const result =
                    await rejectionsCanister.getRejectionCodeCanisterReject();
                return test('CanisterReject' in result);
            }
        },
        {
            name: 'reject code CANISTER_ERROR',
            test: async () => {
                const result =
                    await rejectionsCanister.getRejectionCodeCanisterError();
                return test('CanisterError' in result);
            }
        },
        {
            name: 'reject message',
            test: async () => {
                const rejectionMessage = 'custom rejection message';
                const result =
                    await rejectionsCanister.getRejectionMessage(
                        rejectionMessage
                    );
                return testEquality(result, rejectionMessage);
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
