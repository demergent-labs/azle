import {
    ic,
    match,
    nat,
    nat64,
    NotifyResult,
    $query,
    $update,
    Variant
} from 'azle';
import { cycles_canister } from '../cycles';

type SendCyclesResult = Variant<{
    Ok: nat64;
    Err: string;
}>;

type SendCyclesResult128 = Variant<{
    Ok: nat;
    Err: string;
}>;

// Reports the number of cycles returned from the Cycles canister
$update;
export async function send_cycles(): Promise<SendCyclesResult> {
    const result = await cycles_canister
        .receive_cycles()
        .cycles(1_000_000n)
        .call();

    return match(result, {
        Ok: () => ({ Ok: ic.msgCyclesRefunded() }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export function send_cycles_notify(): NotifyResult {
    return cycles_canister.receive_cycles().cycles(1_000_000n).notify();
}

// Reports the number of cycles returned from the Cycles canister
$update;
export async function send_cycles128(): Promise<SendCyclesResult128> {
    const result = await cycles_canister
        .receive_cycles128()
        .cycles128(1_000_000n)
        .call();

    return match(result, {
        Ok: () => ({ Ok: ic.msgCyclesRefunded128() }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export function send_cycles128_notify(): NotifyResult {
    return cycles_canister.receive_cycles128().cycles128(1_000_000n).notify();
}

$query;
export function get_canister_balance(): nat64 {
    return ic.canisterBalance();
}

$query;
export function get_canister_balance128(): nat {
    return ic.canisterBalance128();
}
