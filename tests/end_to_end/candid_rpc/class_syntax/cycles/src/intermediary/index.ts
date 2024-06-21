import {
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

export default class {
    @init([])
    init() {
        cyclesCanister = Cycles(Principal.fromText(getCyclesPrincipal()));
    }
    // Reports the number of cycles returned from the Cycles canister
    @update([], nat64)
    async sendCycles() {
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
    }
    @update([], Void)
    sendCyclesNotify() {
        return ic.notify(cyclesCanister.receiveCycles, {
            cycles: 1_000_000n
        });
    }
    // Reports the number of cycles returned from the Cycles canister
    @update([], nat)
    async sendCycles128() {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            await fetch(`icp://${getCyclesPrincipal()}/receiveCycles128`, {
                body: serialize({
                    candidPath: '/candid/cycles.did',
                    cycles128: 1_000_000n
                })
            });
        } else {
            await ic.call(cyclesCanister.receiveCycles128, {
                cycles128: 1_000_000n
            });
        }

        return ic.msgCyclesRefunded128();
    }
    @update([], Void)
    sendCycles128Notify() {
        return ic.notify(cyclesCanister.receiveCycles128, {
            cycles: 1_000_000n
        });
    }
    @query([], nat64)
    getCanisterBalance() {
        return ic.canisterBalance();
    }
    @query([], nat)
    getCanisterBalance128() {
        return ic.canisterBalance128();
    }
}

function getCyclesPrincipal(): string {
    return (
        process.env.CYCLES_PRINCIPAL ??
        ic.trap('process.env.CYCLES_PRINCIPAL is undefined')
    );
}
