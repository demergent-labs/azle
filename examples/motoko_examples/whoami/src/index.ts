import {
    Canister,
    ic,
    init,
    postUpgrade,
    principal,
    Principal,
    query,
    update
} from 'azle';

// We use the zero principal but any principal could be used.
let install: Principal = Principal.fromText('aaaaa-aa');
let someone: Principal = Principal.fromText('aaaaa-aa');

const whoami = update([], principal, () => {
    return ic.caller();
});

export default Canister({
    // Manually save the calling principal and argument for later access.
    init: init([principal], (somebody) => {
        install = ic.caller();
        someone = somebody;
    }),
    // Manually re-save these variables after new deploys.
    postUpgrade: postUpgrade([principal], (somebody) => {
        install = ic.caller();
        someone = somebody;
    }),
    // Return the principal identifier of the wallet canister that installed this
    // canister.
    installer: query([], principal, () => {
        return install;
    }),
    // Return the principal identifier that was provided as an installation
    // argument to this canister.
    argument: query([], principal, () => {
        return someone;
    }),
    // Return the principal identifier of the caller of this method.
    whoami,
    // Return the principal identifier of this canister.
    id: update([], principal, async () => {
        // TODO This is not an ideal solution but will work for now
        const self = Canister({
            whoami
        })(ic.id());

        return await ic.call(self.whoami);
    }),
    // Return the principal identifier of this canister via the global `ic` object.
    // This is much quicker than `id()` above because it isn't making a cross-
    // canister call to itself. Additionally, it can now be a `Query` which means it
    // doesn't have to go through consensus.
    idQuick: query([], principal, () => {
        return ic.id();
    })
});
