import {
    Canister,
    ic,
    init,
    nat,
    Principal,
    query,
    serialize,
    update,
    Void
} from 'azle/experimental';

import Cycles from '../cycles';

let cyclesCanister: typeof Cycles;

export default Canister({
    init: init([], () => {
        cyclesCanister = Cycles(Principal.fromText(getCyclesPrincipal()));
    }),
    // Reports the number of cycles returned from the Cycles canister
    sendCycles: update([], nat, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCyclesPrincipal()}/receiveCycles`,
                {
                    body: serialize({
                        candidPath: '/candid/cycles.did',
                        cycles: 1_000_000n
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(cyclesCanister.receiveCycles, {
                cycles: 1_000_000n
            });
        }
    }),
    sendCyclesNotify: update([], Void, () => {
        return ic.notify(cyclesCanister.receiveCycles, {
            cycles: 1_000_000n
        });
    }),
    getCanisterBalance: query([], nat, () => {
        return ic.canisterBalance();
    })
});

function getCyclesPrincipal(): string {
    return (
        process.env.CYCLES_PRINCIPAL ??
        ic.trap('process.env.CYCLES_PRINCIPAL is undefined')
    );
}
