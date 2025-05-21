import { IDL, Principal, query, update } from 'azle';

// A simple canister that provides methods for testing inter-canister call errors
export default class {
    @query([], IDL.Principal)
    getSelf(): Principal {
        return ic.id();
    }

    // This method will explicitly reject the call
    @update([], IDL.Bool)
    explicitly_reject(): boolean {
        ic.reject('Explicitly rejected for testing');
        return true; // This will never be reached
    }

    // A valid method that returns success
    @update([], IDL.Bool)
    valid_method(): boolean {
        return true;
    }
}
