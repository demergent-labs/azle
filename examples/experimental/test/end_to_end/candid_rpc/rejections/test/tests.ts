import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/rejections/rejections.did';

export function getTests(rejectionsCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('reject code NO_ERROR', async () => {
            const result = await rejectionsCanister.getRejectionCodeNoError();

            expect(result).toStrictEqual(0);
        });

        it('reject code DESTINATION_INVALID', async () => {
            const result =
                await rejectionsCanister.getRejectionCodeDestinationInvalid();

            expect(result).toStrictEqual(3);
        });

        it('reject code CANISTER_REJECT', async () => {
            const result =
                await rejectionsCanister.getRejectionCodeCanisterReject();

            expect(result).toStrictEqual(4);
        });

        it('reject code CANISTER_ERROR', async () => {
            const result =
                await rejectionsCanister.getRejectionCodeCanisterError();

            expect(result).toStrictEqual(5);
        });

        it('reject message', async () => {
            const rejectionMessage = 'custom rejection message';
            const result =
                await rejectionsCanister.getRejectionMessage(rejectionMessage);

            expect(result).toBe(rejectionMessage);
        });
    };
}
