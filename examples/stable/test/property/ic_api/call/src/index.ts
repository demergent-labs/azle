import {
    call,
    CallPerformFailed,
    CallRejected,
    IDL,
    Principal,
    query,
    update
} from 'azle';

export default class {
    @query([], IDL.Principal)
    getSelf(): Principal {
        return ic.id();
    }

    @update([IDL.Principal], IDL.Bool)
    async callNonExistentCanister(canisterId: Principal): Promise<boolean> {
        try {
            // Attempt to call a non-existent canister
            await call<[], boolean>(canisterId, 'some_method');
            return false; // Should not reach here
        } catch (error) {
            // Verify it's a CallPerformFailed error
            return this.isCallPerformFailedError(error);
        }
    }

    @update([IDL.Principal], IDL.Bool)
    async callNonExistentMethod(canisterId: Principal): Promise<boolean> {
        try {
            // Attempt to call a non-existent method on an existing canister
            await call<[], boolean>(canisterId, 'non_existent_method');
            return false; // Should not reach here
        } catch (error) {
            // Verify it's a CallRejected error
            return this.isCallRejectedError(error);
        }
    }

    @update([IDL.Principal], IDL.Bool)
    async callRejectingMethod(canisterId: Principal): Promise<boolean> {
        try {
            // Call a method that explicitly rejects
            await call<[], boolean>(canisterId, 'explicitly_reject');
            return false; // Should not reach here
        } catch (error) {
            // Verify it's a CallRejected error with specific properties
            return this.isCallRejectedError(error);
        }
    }

    // Helper methods to verify error types
    @query([IDL.Variant({ Any: IDL.Null })], IDL.Bool)
    isCallPerformFailedError(error: any): boolean {
        // Check if the error has the correct structure for CallPerformFailed
        const typedError = error as CallPerformFailed;
        return (
            typedError !== null &&
            typeof typedError === 'object' &&
            typedError.type === 'CallPerformFailed'
        );
    }

    @query([IDL.Variant({ Any: IDL.Null })], IDL.Bool)
    isCallRejectedError(error: any): boolean {
        // Check if the error has the correct structure for CallRejected
        const typedError = error as CallRejected;
        return (
            typedError !== null &&
            typeof typedError === 'object' &&
            typedError.type === 'CallRejected' &&
            typeof typedError.rejectCode === 'number' &&
            [1, 2, 3, 4, 5, 6].includes(typedError.rejectCode) &&
            typeof typedError.rejectMessage === 'string' &&
            typedError.rejectMessage.length > 0
        );
    }

    @query([], IDL.Record({ type: IDL.Text }))
    getCallPerformFailedExample(): CallPerformFailed {
        return {
            type: 'CallPerformFailed'
        };
    }

    @query(
        [],
        IDL.Record({
            type: IDL.Text,
            rejectCode: IDL.Nat8,
            rejectMessage: IDL.Text
        })
    )
    getCallRejectedExample(): CallRejected {
        return {
            type: 'CallRejected',
            rejectCode: 3, // DestinationInvalid
            rejectMessage: 'Example reject message'
        };
    }
}
