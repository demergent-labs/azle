import {
    call,
    canisterSelf,
    IDL,
    init,
    msgArgData,
    msgCaller,
    postUpgrade,
    Principal,
    query,
    update
} from 'azle';

class WhoAmI {
    install: Principal = Principal.fromText('aaaaa-aa');
    someone: Principal = Principal.fromText('aaaaa-aa');

    // Manually save the calling principal and argument for later access.
    @init([IDL.Principal])
    init(somebody: Principal): void {
        this.install = msgCaller();
        this.someone = somebody;
    }

    // Manually re-save these variables after new deploys.
    @postUpgrade([IDL.Principal], { manual: true })
    postUpgrade(): void {
        const somebody = IDL.decode(
            [IDL.Principal],
            msgArgData()
        )[0] as unknown as Principal;

        this.install = msgCaller();
        this.someone = somebody;
    }

    // Return the principal identifier of the wallet canister that installed this
    // canister.
    @query([], IDL.Principal)
    installer(): Principal {
        return this.install;
    }

    // Return the principal identifier that was provided as an installation
    // argument to this canister.
    @query([], IDL.Principal)
    argument(): Principal {
        return this.someone;
    }

    // Return the principal identifier of the caller of this method.
    @update([], IDL.Principal)
    whoami(): Principal {
        return msgCaller();
    }

    // Return the principal identifier of this canister.
    @update([], IDL.Principal)
    async id(): Promise<Principal> {
        return await call<undefined, Principal>(canisterSelf(), 'whoami', {
            returnIdlType: IDL.Principal
        });
    }

    // Return the principal identifier of this canister via the global `ic` object.
    // This is much quicker than `id()` above because it isn't making a cross-
    // canister call to itself. Additionally, it can now be a `Query` which means it
    // doesn't have to go through consensus.
    @query([], IDL.Principal)
    idQuick(): Principal {
        return canisterSelf();
    }
}

export default WhoAmI;
