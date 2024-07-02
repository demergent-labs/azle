import {
    call,
    caller,
    id,
    IDL,
    init,
    postUpgrade,
    Principal,
    query,
    update
} from 'azle';

// We use the zero principal but any principal could be used.
let install: Principal = Principal.fromText('aaaaa-aa');
let someone: Principal = Principal.fromText('aaaaa-aa');

class WhoAmI {
    // Manually save the calling principal and argument for later access.
    @init([IDL.Principal])
    init(somebody: Principal) {
        install = caller();
        someone = somebody;
    }
    // Manually re-save these variables after new deploys.
    @postUpgrade([IDL.Principal])
    postUpgrade(somebody: Principal) {
        install = caller();
        someone = somebody;
    }
    // Return the principal identifier of the wallet canister that installed this
    // canister.
    @query([], IDL.Principal)
    installer() {
        return install;
    }
    // Return the principal identifier that was provided as an installation
    // argument to this canister.
    @query([], IDL.Principal)
    argument() {
        return someone;
    }
    // Return the principal identifier of the caller of this method.
    @update([], IDL.Principal)
    whoami() {
        return caller();
    }
    // Return the principal identifier of this canister.
    @update([], IDL.Principal)
    async id() {
        return await call(id(), 'whoami', { returnIdl: IDL.Principal });
    }
    // Return the principal identifier of this canister via the global `ic` object.
    // This is much quicker than `id()` above because it isn't making a cross-
    // canister call to itself. Additionally, it can now be a `Query` which means it
    // doesn't have to go through consensus.
    @query([], IDL.Principal)
    idQuick() {
        return id();
    }
}

export default WhoAmI;
