// TODO Once https://github.com/demergent-labs/azle/issues/3074 is resolved
// TODO remove the `errorType` hacks and just use `type`

import {
    call,
    CallPerformFailed,
    CallRejected,
    IDL,
    InsufficientLiquidCycleBalance,
    update
} from 'azle';

const CallPerformFailedError = IDL.Record({
    errorType: IDL.Text,
    message: IDL.Text
});
type CallPerformFailedError = CallPerformFailed & {
    message: string;
};

const CallRejectedError = IDL.Record({
    errorType: IDL.Text,
    rejectCode: IDL.Nat32,
    rejectMessage: IDL.Text,
    message: IDL.Text
});
type CallRejectedError = CallRejected & {
    message: string;
};

const InsufficientLiquidCycleBalanceError = IDL.Record({
    errorType: IDL.Text,
    available: IDL.Nat,
    required: IDL.Nat,
    message: IDL.Text
});
type InsufficientLiquidCycleBalanceError = InsufficientLiquidCycleBalance & {
    message: string;
};

export default class {
    @update([], CallPerformFailedError)
    async test0(): Promise<CallPerformFailedError> {
        try {
            // Assuming the outgoing call queue is ~500 in length,
            // queuing up 1_000 calls should safely exceed the limit
            // and cause the call to fail with a CallPerformFailed error
            for (let i = 0; i < 1_000; i++) {
                call('aaaaa-aa', 'raw_rand');
            }

            await call('aaaaa-aa', 'raw_rand');

            throw new Error(
                'This signifies that the call did not fail as expected'
            );
        } catch (error: any) {
            return {
                ...error,
                errorType: error.type
            } as CallPerformFailedError;
        }
    }

    @update([], CallRejectedError)
    async test1(): Promise<CallRejectedError> {
        try {
            await call('aaaaa-aa', 'nonexistent_method');

            throw new Error(
                'This signifies that the call did not fail as expected'
            );
        } catch (error: any) {
            return {
                ...error,
                errorType: error.type
            } as CallRejectedError;
        }
    }

    @update([], CallRejectedError)
    async test2(): Promise<CallRejectedError> {
        try {
            await call('vaupb-eqaaa-aaaai-qplka-cai', 'raw_rand');

            throw new Error(
                'This signifies that the call did not fail as expected'
            );
        } catch (error: any) {
            return {
                ...error,
                errorType: error.type
            } as CallRejectedError;
        }
    }

    @update([], InsufficientLiquidCycleBalanceError)
    async test3(): Promise<InsufficientLiquidCycleBalanceError> {
        try {
            await call('aaaaa-aa', 'raw_rand', {
                cycles: 1_000_000_000_000_000_000_000_000n
            });

            throw new Error(
                'This signifies that the call did not fail as expected'
            );
        } catch (error: any) {
            return {
                ...error,
                errorType: error.type
            } as InsufficientLiquidCycleBalanceError;
        }
    }

    @update([], CallPerformFailedError)
    async test4(): Promise<CallPerformFailedError> {
        try {
            // Assuming the outgoing call queue is ~500 in length,
            // queuing up 1_000 calls should safely exceed the limit
            // and cause the call to fail with a CallPerformFailed error
            for (let i = 0; i < 1_000; i++) {
                call('aaaaa-aa', 'raw_rand', {
                    oneway: true
                });
            }

            await call('aaaaa-aa', 'raw_rand', {
                oneway: true
            });

            throw new Error(
                'This signifies that the call did not fail as expected'
            );
        } catch (error: any) {
            return {
                ...error,
                errorType: error.type
            } as CallPerformFailedError;
        }
    }

    @update([], InsufficientLiquidCycleBalanceError)
    async test5(): Promise<InsufficientLiquidCycleBalanceError> {
        try {
            await call('aaaaa-aa', 'raw_rand', {
                oneway: true,
                cycles: 1_000_000_000_000_000_000_000_000n
            });

            throw new Error(
                'This signifies that the call did not fail as expected'
            );
        } catch (error: any) {
            return {
                ...error,
                errorType: error.type
            } as InsufficientLiquidCycleBalanceError;
        }
    }
}
