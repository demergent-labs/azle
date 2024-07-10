import { Canister, ic, nat, query, update } from 'azle/experimental';

export default Canister({
    receiveCycles: update([], nat, () => {
        return ic.msgCyclesAccept(ic.msgCyclesAvailable() / 2n);
    }),
    getCanisterBalance: query([], nat, () => {
        return ic.canisterBalance();
    })
});
