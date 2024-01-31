import {
    Canister,
    ic,
    init,
    nat,
    nat64,
    Principal,
    query,
    serialize,
    update,
    Void
} from 'azle';
import Cycles from '../cycles';

let cyclesCanister: typeof Cycles;

export default Canister({
    init: init([], () => {
        cyclesCanister = Cycles(Principal.fromText(getCyclesPrincipal()));
    }),
    // Reports the number of cycles returned from the Cycles canister
    sendCycles: update([], nat64, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCyclesPrincipal()}/receiveCycles`,
                {
                    body: serialize({
                        candidPath: '/src/cycles/index.did',
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
    // Reports the number of cycles returned from the Cycles canister
    sendCycles128: update([], nat, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://${getCyclesPrincipal()}/receiveCycles128`, {
                body: serialize({
                    candidPath: '/src/cycles/index.did',
                    cycles128: 1_000_000n
                })
            });
        } else {
            await ic.call(cyclesCanister.receiveCycles128, {
                cycles128: 1_000_000n
            });
        }

        return ic.msgCyclesRefunded128();
    }),
    sendCycles128Notify: update([], Void, () => {
        return ic.notify(cyclesCanister.receiveCycles128, {
            cycles: 1_000_000n
        });
    }),
    getCanisterBalance: query([], nat64, () => {
        return ic.canisterBalance();
    }),
    getCanisterBalance128: query([], nat, () => {
        return ic.canisterBalance128();
    })
});

function getCyclesPrincipal(): string {
    return (
        process.env.CYCLES_PRINCIPAL ??
        ic.trap('process.env.CYCLES_PRINCIPAL is undefined')
    );
}
