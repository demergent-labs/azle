import { cycles } from '../cycles';
import { ic, nat64, UpdateAsync } from 'azle';

// Reports the number of cycles returned from the Cycles canister
export function* reportRefund(): UpdateAsync<nat64> {
    // TODO: This doesn't actually send cycles right now.
    // See https://github.com/demergent-labs/azle/issues/387
    yield cycles.sendCycles();
    return ic.msg_cycles_refunded();
}
