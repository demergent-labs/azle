import { expect } from '@jest/globals';
import { getCanisterActor, it, Test } from 'azle/_internal/test';

import { _SERVICE as CallerActor } from './dfx_generated/caller/caller.did';

export function getTests(): Test {
    return () => {
        it('should produce a CallError: CallRejected with reject code 5', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');

            const callRejected = await caller.test0();

            expect(callRejected.errorType).toBe('CallRejected');
            expect(callRejected.rejectCode).toBe(5);
            expect(callRejected.rejectMessage).toBe(
                `IC0536: Management canister has no method 'test'`
            );
            expect(callRejected.message).toBe(
                `call rejected: 5 - IC0536: Management canister has no method 'test'`
            );
        });

        it('should produce a CallError: CallRejected with reject code 3', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');

            const callRejected = await caller.test1();

            expect(callRejected.errorType).toBe('CallRejected');
            expect(callRejected.rejectCode).toBe(3);
            expect(callRejected.rejectMessage).toBe(
                'No route to canister vaupb-eqaaa-aaaai-qplka-cai'
            );
            expect(callRejected.message).toBe(
                `call rejected: 3 - No route to canister vaupb-eqaaa-aaaai-qplka-cai`
            );
        });

        it('should produce a CallError: InsufficientLiquidCycleBalance', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');

            const callRejected = await caller.test2();

            expect(callRejected.errorType).toBe(
                'InsufficientLiquidCycleBalance'
            );
            expect(typeof callRejected.available).toBe('bigint');
            expect(typeof callRejected.required).toBe('bigint');
            expect(callRejected.message).toMatch(
                /^insufficient liquid cycles balance, available: \d+, required: \d+$/
            );
        });
    };
}
