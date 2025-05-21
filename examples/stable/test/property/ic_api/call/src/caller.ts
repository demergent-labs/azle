import {
    call,
    CallRejected,
    IDL,
    InsufficientLiquidCycleBalance,
    update
} from 'azle';

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
    @update([], CallRejectedError)
    async test0(): Promise<CallRejectedError> {
        try {
            await call('aaaaa-aa', 'test');

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
    async test1(): Promise<CallRejectedError> {
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
    async test2(): Promise<InsufficientLiquidCycleBalanceError> {
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
}
