import {
    Canister,
    ic,
    init,
    postUpgrade,
    Principal,
    query,
    serialize,
    update
} from 'azle/experimental';

// We use the zero principal but any principal could be used.
let install: Principal = Principal.fromText('aaaaa-aa');
let someone: Principal = Principal.fromText('aaaaa-aa');

const WhoAmI = Canister({
    // Manually save the calling principal and argument for later access.
@init([Principal])
    init(somebody){
        install = ic.caller();
        someone = somebody;
    }
    // Manually re-save these variables after new deploys.
@postUpgrade([Principal])
    postUpgrade(somebody){
        install = ic.caller();
        someone = somebody;
    }
    // Return the principal identifier of the wallet canister that installed this
    // canister.
@query([], Principal)
    installer(){
        return install;
    }
    // Return the principal identifier that was provided as an installation
    // argument to this canister.
@query([], Principal)
    argument(){
        return someone;
    }
    // Return the principal identifier of the caller of this method.
@update([], Principal)
    whoami(){
        return ic.caller();
    }
    // Return the principal identifier of this canister.
@update([], Principal)
async id(){
        const self: any = WhoAmI(ic.id());

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${self.principal.toText()}/whoami`,
                {
                    body: serialize({
                        candidPath: `/candid/whoami.did`
                    })
                }
            );

            return await response.json();
        } else {
            return await ic.call(self.whoami);
        }
    }
    // Return the principal identifier of this canister via the global `ic` object.
    // This is much quicker than `id()` above because it isn't making a cross-
    // canister call to itself. Additionally, it can now be a `Query` which means it
    // doesn't have to go through consensus.
@query([], Principal)
    idQuick(){
        return ic.id();
    }
});

export default WhoAmI;
