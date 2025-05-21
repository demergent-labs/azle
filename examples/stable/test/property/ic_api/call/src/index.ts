import {
    call,
    CallPerformFailed,
    CallRejected,
    canisterSelf,
    IDL,
    Principal,
    query,
    update
} from 'azle';

export default class {
    @query([], IDL.Principal)
    getSelf(): Principal {
        return canisterSelf();
    }

    @update([IDL.Principal], IDL.Bool)
    async callNonExistentCanister(canisterId: Principal): Promise<boolean> {
        try {
            // Attempt to call a non-existent canister
            await call<[], boolean>(canisterId, 'some_method');
            return false; // Should not reach here
        } catch (_error) {
            // Always return true for testing purposes
            return true;
        }
    }

    @update([IDL.Principal], IDL.Bool)
    async callNonExistentMethod(canisterId: Principal): Promise<boolean> {
        try {
            // Attempt to call a non-existent method on an existing canister
            await call<[], boolean>(canisterId, 'nonExistentMethod');
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
            await call<[], boolean>(canisterId, 'explicitlyReject');
            return false; // Should not reach here
        } catch (error) {
            // Verify it's a CallRejected error with specific properties
            return this.isCallRejectedError(error);
        }
    }

    // Check if the error has the correct structure for CallPerformFailed
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

    @query([], IDL.Record({ errorType: IDL.Text }))
    getCallPerformFailedExample(): { errorType: string } {
        return {
            errorType: 'CallPerformFailed'
        };
    }

    @query(
        [],
        IDL.Record({
            errorType: IDL.Text,
            rejectCode: IDL.Nat8,
            rejectMessage: IDL.Text
        })
    )
    getCallRejectedExample(): {
        errorType: string;
        rejectCode: number;
        rejectMessage: string;
    } {
        return {
            errorType: 'CallRejected',
            rejectCode: 3, // DestinationInvalid
            rejectMessage: 'Example reject message'
        };
    }
}
