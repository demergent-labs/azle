import { expect } from '@jest/globals';
import { getCanisterActor, it, Test } from 'azle/_internal/test';

import { _SERVICE as StaticErrorsActor } from './dfx_generated/static_errors/static_errors.did';

export function getTests(): Test {
    return () => {
        it('should produce a CallError: CallPerformFailed', async () => {
            const actor =
                await getCanisterActor<StaticErrorsActor>('static_errors');

            const callPerformFailed = await actor.test0();

            expect(callPerformFailed.errorType).toBe('CallPerformFailed');
            expect(callPerformFailed.message).toBe('call perform failed');
        });

        it('should produce a CallError: CallRejected with reject code 5', async () => {
            const actor =
                await getCanisterActor<StaticErrorsActor>('static_errors');

            const callRejected = await actor.test1();

            expect(callRejected.errorType).toBe('CallRejected');
            expect(callRejected.rejectCode).toBe(5);
            expect(callRejected.rejectMessage).toBe(
                `IC0536: Management canister has no method 'nonexistent_method'`
            );
            expect(callRejected.message).toBe(
                `call rejected: 5 - IC0536: Management canister has no method 'nonexistent_method'`
            );
        });

        it('should produce a CallError: CallRejected with reject code 3', async () => {
            const actor =
                await getCanisterActor<StaticErrorsActor>('static_errors');

            const callRejected = await actor.test2();

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
            const actor =
                await getCanisterActor<StaticErrorsActor>('static_errors');

            const insufficientLiquidCycleBalance = await actor.test3();

            expect(insufficientLiquidCycleBalance.errorType).toBe(
                'InsufficientLiquidCycleBalance'
            );
            expect(typeof insufficientLiquidCycleBalance.available).toBe(
                'bigint'
            );
            expect(typeof insufficientLiquidCycleBalance.required).toBe(
                'bigint'
            );
            expect(insufficientLiquidCycleBalance.message).toMatch(
                /^insufficient liquid cycles balance, available: \d+, required: \d+$/
            );
        });

        it('should produce a CallError: CallPerformFailed for a oneway call', async () => {
            const actor =
                await getCanisterActor<StaticErrorsActor>('static_errors');

            const callPerformFailed = await actor.test4();

            expect(callPerformFailed.errorType).toBe('CallPerformFailed');
            expect(callPerformFailed.message).toBe('call perform failed');
        });

        it('should produce a CallError: InsufficientLiquidCycleBalance for a oneway call', async () => {
            const actor =
                await getCanisterActor<StaticErrorsActor>('static_errors');

            const insufficientLiquidCycleBalance = await actor.test5();

            expect(insufficientLiquidCycleBalance.errorType).toBe(
                'InsufficientLiquidCycleBalance'
            );
            expect(typeof insufficientLiquidCycleBalance.available).toBe(
                'bigint'
            );
            expect(typeof insufficientLiquidCycleBalance.required).toBe(
                'bigint'
            );
            expect(insufficientLiquidCycleBalance.message).toMatch(
                /^insufficient liquid cycles balance, available: \d+, required: \d+$/
            );
        });
    };
}
