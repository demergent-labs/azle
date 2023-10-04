import { Canister, ic, nat, nat64, query, update } from 'azle';

export default Canister({
    receiveCycles: update([], nat64, () => {
        return ic.msgCyclesAccept(ic.msgCyclesAvailable() / 2n);
    }),
    // Moves all transferred cycles to the canister
    receiveCycles128: update([], nat, () => {
        return ic.msgCyclesAccept128(ic.msgCyclesAvailable128() / 2n);
    }),
    getCanisterBalance: query([], nat64, () => {
        return ic.canisterBalance();
    }),
    getCanisterBalance128: query([], nat, () => {
        return ic.canisterBalance128();
    })
});
