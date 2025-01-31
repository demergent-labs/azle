import { call, canisterCycleBalance, IDL, notify, trap } from 'azle';
import {
    Canister,
    nat,
    query,
    serialize,
    update,
    Void
} from 'azle/experimental';

export default Canister({
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
            return await call<undefined, bigint>(
                getCyclesPrincipal(),
                'receiveCycles',
                {
                    returnIdlType: IDL.Nat,
                    cycles: 1_000_000n
                }
            );
        }
    }),
    sendCyclesNotify: update([], Void, () => {
        return notify(getCyclesPrincipal(), 'receiveCycles', {
            cycles: 1_000_000n
        });
    }),
    getCanisterCycleBalance: query([], nat, () => {
        return canisterCycleBalance();
    })
});

function getCyclesPrincipal(): string {
    return (
        process.env.CYCLES_PRINCIPAL ??
        trap('process.env.CYCLES_PRINCIPAL is undefined')
    );
}
