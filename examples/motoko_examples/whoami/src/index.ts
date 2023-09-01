import { ic, Principal, query, Service, update, principal } from 'azle';

class WhoAmICanister extends Service {
    @query([], principal)
    installer: () => Promise<Principal>;

    @query([], principal)
    argument: () => Promise<Principal>;

    @update([], principal)
    whoami: () => Promise<Principal>;

    @update([], principal)
    id: () => Promise<Principal>;

    @query([], principal)
    idQuick: () => Promise<Principal>;
}

// Initialize the variables to ensure that they aren't `undefined`.
// We use the zero principal but any principal could be used.
let install: Principal = Principal.fromText('aaaaa-aa');
let someone: Principal = Principal.fromText('aaaaa-aa');

export default class {
    // TODO: Implement this
    // // Manually save the calling principal and argument for later access.
    // @init([Principal], Void)
    // init(somebody: Principal): void {
    //     install = ic.caller();
    //     someone = somebody;
    // }

    // TODO: Implement this
    // // Manually re-save these variables after new deploys.
    // @postUpgrade([Principal], Void)
    // postUpgrade(somebody: Principal): void {
    //     install = ic.caller();
    //     someone = somebody;
    // }

    // Return the principal identifier of the wallet canister that installed this
    // canister.
    @query([], Principal)
    installer(): Principal {
        return install;
    }

    // Return the principal identifier that was provided as an installation
    // argument to this canister.
    @query([], Principal)
    argument(): Principal {
        return someone;
    }

    // Return the principal identifier of the caller of this method.
    @update([], Principal)
    whoami(): Principal {
        return ic.caller();
    }

    // Return the principal identifier of this canister.
    @update([], Principal)
    async id(): Promise<Principal> {
        const thisCanister = new WhoAmICanister(ic.id());

        return await thisCanister.whoami();
    }

    // Return the principal identifier of this canister via the global `ic` object.
    // This is much quicker than `id()` above because it isn't making a cross-
    // canister call to itself. Additionally, it can now be a `Query` which means it
    // doesn't have to go through consensus.
    @query([], Principal)
    idQuick(): Principal {
        return ic.id();
    }
}
