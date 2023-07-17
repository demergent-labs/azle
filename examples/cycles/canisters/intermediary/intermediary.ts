import {
    ic,
    match,
    nat,
    nat64,
    NotifyResult,
    $query,
    Result,
    $update
} from 'azle';
import { cyclesCanister } from '../cycles';

// Reports the number of cycles returned from the Cycles canister
$update;
export async function sendCycles(): Promise<Result<nat64, string>> {
    const result = await cyclesCanister
        .receiveCycles()
        .cycles(1_000_000n)
        .call();

    return match(result, {
        Ok: () => ({ Ok: ic.msgCyclesRefunded() }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export function sendCyclesNotify(): NotifyResult {
    return cyclesCanister.receiveCycles().cycles(1_000_000n).notify();
}

// Reports the number of cycles returned from the Cycles canister
$update;
export async function sendCycles128(): Promise<Result<nat, string>> {
    const result = await cyclesCanister
        .receiveCycles128()
        .cycles128(1_000_000n)
        .call();

    return match(result, {
        Ok: () => ({ Ok: ic.msgCyclesRefunded128() }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export function sendCycles128Notify(): NotifyResult {
    return cyclesCanister.receiveCycles128().cycles128(1_000_000n).notify();
}

$query;
export function getCanisterBalance(): nat64 {
    return ic.canisterBalance();
}

$query;
export function getCanisterBalance128(): nat {
    return ic.canisterBalance128();
}
