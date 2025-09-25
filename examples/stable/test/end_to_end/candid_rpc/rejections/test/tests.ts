import { ActorSubclass } from '@icp-sdk/core/agent';
import { expect, it, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/rejections/rejections.did';

export function getTests(rejectionsCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('reject code NO_ERROR', async () => {
            const result = await rejectionsCanister.getRejectCodeNoError();

            expect(result).toStrictEqual(0);
        });

        it('reject code DESTINATION_INVALID', async () => {
            const result =
                await rejectionsCanister.getRejectCodeDestinationInvalid();

            expect(result).toStrictEqual(3);
        });

        it('reject code CANISTER_REJECT', async () => {
            const result =
                await rejectionsCanister.getRejectCodeCanisterReject();

            expect(result).toStrictEqual(4);
        });

        it('reject code CANISTER_ERROR', async () => {
            const result =
                await rejectionsCanister.getRejectCodeCanisterError();

            expect(result).toStrictEqual(5);
        });

        it('reject message', async () => {
            const rejectMessage = 'custom reject message';
            const result =
                await rejectionsCanister.getRejectMessage(rejectMessage);

            expect(result).toBe(rejectMessage);
        });
    };
}
