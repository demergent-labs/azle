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
                    await rejections_canister.getRejectionCodeNoError();
                return {
                    ok: 'NoError' in result
                };
            }
        },
        {
            name: 'reject code DESTINATION_INVALID',
            test: async () => {
                const result =
                    await rejections_canister.getRejectionCodeDestinationInvalid();
                return {
                    ok: 'DestinationInvalid' in result
                };
            }
        },
        {
            name: 'reject code CANISTER_REJECT',
            test: async () => {
                const result =
                    await rejections_canister.getRejectionCodeCanisterReject();
                return {
                    ok: 'CanisterReject' in result
                };
            }
        },
        {
            name: 'reject code CANISTER_ERROR',
            test: async () => {
                const result =
                    await rejections_canister.getRejectionCodeCanisterError();
                return {
                    ok: 'CanisterError' in result
                };
            }
        },
        {
            name: 'reject message',
            test: async () => {
                const rejectionMessage = 'custom rejection message';
                const result = await rejections_canister.getRejectionMessage(
                    rejectionMessage
                );
                return {
                    ok: result === rejectionMessage
                };
            }
        },
        {
            skip: true,
            name: 'result with an accept',
            test: async () => {
                const rejectionMessage = 'custom rejection message';
                const result = await rejections_canister.getResult(
                    { Accept: null },
                    rejectionMessage
                );
                if (!ok(result)) {
                    return {
                        err: result.err
                    };
                }

                return {
                    ok: result.ok === null
                };
            }
        },
        {
            skip: true,
            name: 'result with an accept',
            test: async () => {
                const rejectionMessage = 'custom rejection message';

                const result = await rejections_canister.getResult(
                    { Reject: null },
                    rejectionMessage
                );

                if (ok(result)) {
                    return {
                        ok: false
                    };
                }

                return {
                    ok: result.err === rejectionMessage
                };
            }
        }
    ];
}
