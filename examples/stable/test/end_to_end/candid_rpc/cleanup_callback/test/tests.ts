import { ActorSubclass } from '@icp-sdk/core/agent';
import { expect, it, please, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/cleanup_callback/cleanup_callback.did';

export function getTests(actor: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('should return the initial reject code and message default values', async () => {
            expect(await actor.getRejectCode()).toStrictEqual(0);
            expect(await actor.getRejectMessage()).toStrictEqual('no error');
        });

        it('should return a Uint8Array of length 32 when getRandomness is called', async () => {
            const result = await actor.getRandomness();
            expect(result).toHaveLength(32);
        });

        it('should reject with trap when getRandomnessWithTrapUncaught is called', async () => {
            await expect(actor.getRandomnessWithTrapUncaught()).rejects.toThrow(
                'trapped from getRandomnessWithTrapUncaught'
            );
        });

        it('should still return the initial reject code and message default values', async () => {
            expect(await actor.getRejectCode()).toStrictEqual(0);
            expect(await actor.getRejectMessage()).toStrictEqual('no error');
        });

        it('should have 0 globalThis._azleRejectCallbacks and 0 globalThis._azleResolveCallbacks', () => {
            checkGlobalSettleCallbacksLengths(0);
        });

        it('should reject with trap when getRandomnessWithTrapCaught is called', async () => {
            await expect(actor.getRandomnessWithTrapCaught()).rejects.toThrow(
                'trapped from getRandomnessWithTrapCaught'
            );
        });

        it('should return the updated reject code and message after caught trap', async () => {
            expect(await actor.getRejectCode()).toStrictEqual(10_001);
            expect(await actor.getRejectMessage()).toStrictEqual(
                'executing within cleanup callback'
            );
        });

        it('should have 0 globalThis._azleRejectCallbacks and 0 globalThis._azleResolveCallbacks', () => {
            checkGlobalSettleCallbacksLengths(0);
        });

        it('should reject with trap when getRandomnessWithTrapCaughtRejectCallback is called', async () => {
            await expect(
                actor.getRandomnessWithTrapCaughtRejectCallback()
            ).rejects.toThrow('executing within the reject callback');
        });

        it('should return the updated reject code and message after caught trap', async () => {
            expect(await actor.getRejectCode()).toStrictEqual(10_001);
            expect(await actor.getRejectMessage()).toStrictEqual(
                'executing within cleanup callback'
            );
        });

        it('should have 0 globalThis._azleRejectCallbacks and 0 globalThis._azleResolveCallbacks', () => {
            checkGlobalSettleCallbacksLengths(0);
        });

        it('should reject with trap when getRandomnessWithTrapCaughtPromise is called', async () => {
            await expect(
                actor.getRandomnessWithTrapCaughtPromise()
            ).rejects.toThrow(
                'trapped from getRandomnessWithTrapCaughtPromise'
            );
        });

        it('should return the updated reject code and message after caught trap in promise version', async () => {
            expect(await actor.getRejectCode()).toStrictEqual(10_001);
            expect(await actor.getRejectMessage()).toStrictEqual(
                'executing within cleanup callback'
            );
        });

        it('should have 0 globalThis._azleRejectCallbacks and 0 globalThis._azleResolveCallbacks', () => {
            checkGlobalSettleCallbacksLengths(0);
        });

        it('should reject with trap when getRandomnessWithTrapCaughtAndTrapAgain is called', async () => {
            await expect(
                actor.getRandomnessWithTrapCaughtAndTrapAgain()
            ).rejects.toThrow(
                'trapped from getRandomnessWithTrapCaughtAndTrapAgain'
            );
        });

        it('should not return the updated reject code and message after caught trap in promise version', async () => {
            expect(await actor.getRejectCode()).toStrictEqual(0);
            expect(await actor.getRejectMessage()).toStrictEqual('no error');
        });

        it('should have 1 globalThis._azleRejectCallbacks and 1 globalThis._azleResolveCallbacks', () => {
            checkGlobalSettleCallbacksLengths(1);
        });

        please(
            'delete the globalThis._azleRejectCallbacks and globalThis._azleResolveCallbacks',
            async () => {
                await actor.deleteAzleGlobalSettleCallbacks();
            }
        );

        it('should reject and not trap when getRandomnessMsgRejectInReplyCallback is called', async () => {
            await expect(
                actor.getRandomnessMsgRejectInReplyCallback()
            ).rejects.toThrow(
                /calling msgReject from getRandomnessMsgRejectInReplyCallback/
            );
        });

        it('should reject and not trap when getRandomnessMsgRejectInRejectCallback is called', async () => {
            await expect(
                actor.getRandomnessMsgRejectInRejectCallback()
            ).rejects.toThrow(
                /calling msgReject from getRandomnessMsgRejectInRejectCallback/
            );
        });

        it('calls setTimerWithTrap methods', async () => {
            expect(await actor.setTimerWithTrap()).toStrictEqual(true);
            expect(
                await actor.setTimerWithTrapAndInterCanisterCall()
            ).toStrictEqual(true);
            expect(
                await actor.setTimerWithTrapAndInterCanisterCalls()
            ).toStrictEqual(true);

            checkGlobalTimerCallbacksLength(0);
        });
    };
}

function checkGlobalSettleCallbacksLengths(expectedLength: number): void {
    const azleRejectCallbacksLen = Number(
        execSync(
            `dfx canister call cleanup_callback _azle_reject_callbacks_len --output json`,
            {
                encoding: 'utf-8'
            }
        )
    );

    const azleResolveCallbacksLen = Number(
        execSync(
            `dfx canister call cleanup_callback _azle_resolve_callbacks_len --output json`,
            {
                encoding: 'utf-8'
            }
        )
    );

    expect(azleRejectCallbacksLen).toStrictEqual(expectedLength);
    expect(azleResolveCallbacksLen).toStrictEqual(expectedLength);
}

function checkGlobalTimerCallbacksLength(expectedLength: number): void {
    const azleTimerCallbacksLen = Number(
        execSync(
            `dfx canister call cleanup_callback _azle_timer_callbacks_len --output json`,
            {
                encoding: 'utf-8'
            }
        )
    );

    expect(azleTimerCallbacksLen).toStrictEqual(expectedLength);
}
