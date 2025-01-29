import { canisterBalance, msgCyclesAccept, msgCyclesAvailable } from 'azle';
import { Canister, nat, query, update } from 'azle/experimental';

export default Canister({
    receiveCycles: update([], nat, () => {
        return msgCyclesAccept(msgCyclesAvailable() / 2n);
    }),
    getCanisterBalance: query([], nat, () => {
        return canisterBalance();
    })
});
