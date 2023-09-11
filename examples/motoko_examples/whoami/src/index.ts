import {
    ic,
    init,
    postUpgrade,
    principal,
    Principal,
    query,
    Service,
    update,
    Void
} from 'azle';

export default class extends Service {
    // Initialize the variables to ensure that they aren't `undefined`.
    // We use the zero principal but any principal could be used.
    install: Principal = Principal.fromText('aaaaa-aa');
    someone: Principal = Principal.fromText('aaaaa-aa');

    // Manually save the calling principal and argument for later access.
    @init([principal], Void)
    init(somebody: Principal): Void {
        this.install = ic.caller();
        this.someone = somebody;
    }

    // Manually re-save these variables after new deploys.
    @postUpgrade([principal], Void)
    postUpgrade(somebody: Principal): Void {
        this.install = ic.caller();
        this.someone = somebody;
    }

    // Return the principal identifier of the wallet canister that installed this
    // canister.
    @query([], principal)
    installer(): Principal {
        return this.install;
    }

    // Return the principal identifier that was provided as an installation
    // argument to this canister.
    @query([], principal)
    argument(): Principal {
        return this.someone;
    }

    // Return the principal identifier of the caller of this method.
    @update([], principal)
    whoami(): Principal {
        return ic.caller();
    }

    // Return the principal identifier of this canister.
    @update([], principal)
    async id(): Promise<Principal> {
        return await ic.call(this.whoami, {
            args: []
        });
    }

    // Return the principal identifier of this canister via the global `ic` object.
    // This is much quicker than `id()` above because it isn't making a cross-
    // canister call to itself. Additionally, it can now be a `Query` which means it
    // doesn't have to go through consensus.
    @query([], principal)
    idQuick(): Principal {
        return ic.id();
    }
}
