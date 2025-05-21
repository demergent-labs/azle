import { canisterSelf, IDL, msgReject, Principal, query, update } from 'azle';

// A simple canister that provides methods for testing inter-canister call errors
export default class {
    @query([], IDL.Principal)
    getSelf(): Principal {
        return canisterSelf();
    }

    // This method will explicitly reject the call
    @update([], IDL.Bool)
    explicitlyReject(): boolean {
        msgReject('Explicitly rejected for testing');
        return true; // This will never be reached
    }

    // A valid method that returns success
    @update([], IDL.Bool)
    validMethod(): boolean {
        return true;
    }
}
