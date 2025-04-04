import { call, canisterSelf, IDL, msgCaller } from 'azle';
import {
    Canister,
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
    init: init([Principal], (somebody) => {
        install = msgCaller();
        someone = somebody;
    }),
    // Manually re-save these variables after new deploys.
    postUpgrade: postUpgrade([Principal], (somebody) => {
        install = msgCaller();
        someone = somebody;
    }),
    // Return the principal identifier of the wallet canister that installed this
    // canister.
    installer: query([], Principal, () => {
        return install;
    }),
    // Return the principal identifier that was provided as an installation
    // argument to this canister.
    argument: query([], Principal, () => {
        return someone;
    }),
    // Return the principal identifier of the caller of this method.
    whoami: update([], Principal, () => {
        return msgCaller();
    }),
    // Return the principal identifier of this canister.
    id: update([], Principal, async () => {
        const self: any = WhoAmI(canisterSelf());

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
            return await call<undefined, Principal>(self.principal, 'whoami', {
                returnIdlType: IDL.Principal
            });
        }
    }),
    // Return the principal identifier of this canister via the global `ic` object.
    // This is much quicker than `id()` above because it isn't making a cross-
    // canister call to itself. Additionally, it can now be a `Query` which means it
    // doesn't have to go through consensus.
    idQuick: query([], Principal, () => {
        return canisterSelf();
    })
});

export default WhoAmI;
