import { call, IDL, Principal, update } from 'azle';

/**
 * Type alias for the error response structure that will be returned to the test
 */
type ErrorResponse = {
    errorType: string;
    rejectCode?: number;
    rejectMessage?: string;
    available?: bigint;
    required?: bigint;
};

/**
 * Caller canister that makes various inter-canister calls to test error handling
 */
export default class {
    /**
     * Attempts to call a non-existent canister, which should result in CallPerformFailed
     */
    @update(
        [],
        IDL.Record({
            errorType: IDL.Text,
            rejectCode: IDL.Opt(IDL.Nat),
            rejectMessage: IDL.Opt(IDL.Text)
        })
    )
    async callNonExistentCanister(): Promise<ErrorResponse> {
        try {
            // Generate a random principal that doesn't exist
            // The pattern "aaaaa-dft5u-..." is unlikely to exist
            await call<[], string>(
                'aaaaa-dft5u-xtab6-42hl7-ydkru-oeoue-4dnki-idawb-kk2ta-qauuk-nae',
                'nonExistentMethod'
            );

            // If we get here, the test failed
            return {
                errorType: 'No error was thrown'
            };
        } catch (error: any) {
            return {
                errorType: error.type,
                rejectCode:
                    'rejectCode' in error ? error.rejectCode : undefined,
                rejectMessage:
                    'rejectMessage' in error ? error.rejectMessage : undefined
            };
        }
    }

    /**
     * Calls the callee canister with a method that doesn't exist, should result in CallRejected
     */
    @update(
        [IDL.Principal],
        IDL.Record({
            errorType: IDL.Text,
            rejectCode: IDL.Opt(IDL.Nat),
            rejectMessage: IDL.Opt(IDL.Text)
        })
    )
    async callNonExistentMethod(
        calleeCanisterId: Principal
    ): Promise<ErrorResponse> {
        try {
            await call<[], string>(calleeCanisterId, 'nonExistentMethod');

            // If we get here, the test failed
            return {
                errorType: 'No error was thrown'
            };
        } catch (error: any) {
            return {
                errorType: error.type,
                rejectCode:
                    'rejectCode' in error ? error.rejectCode : undefined,
                rejectMessage:
                    'rejectMessage' in error ? error.rejectMessage : undefined
            };
        }
    }

    /**
     * Calls the callee's explicitReject method, which should result in CallRejected
     */
    @update(
        [IDL.Principal],
        IDL.Record({
            errorType: IDL.Text,
            rejectCode: IDL.Opt(IDL.Nat),
            rejectMessage: IDL.Opt(IDL.Text)
        })
    )
    async callExplicitReject(
        calleeCanisterId: Principal
    ): Promise<ErrorResponse> {
        try {
            await call<[], void>(calleeCanisterId, 'explicitReject');

            // If we get here, the test failed
            return {
                errorType: 'No error was thrown'
            };
        } catch (error: any) {
            return {
                errorType: error.type,
                rejectCode:
                    'rejectCode' in error ? error.rejectCode : undefined,
                rejectMessage:
                    'rejectMessage' in error ? error.rejectMessage : undefined
            };
        }
    }

    /**
     * Calls a successful method on the callee, should succeed
     */
    @update([IDL.Principal], IDL.Text)
    async callSuccessfulMethod(calleeCanisterId: Principal): Promise<string> {
        return await call<[], string>(calleeCanisterId, 'successfulMethod');
    }
}
