import {
    ic,
    nat,
    nat64,
    NotifyResult,
    ok,
    $query,
    $update,
    Variant
} from 'azle';
import { cycles_canister } from '../cycles';

type SendCyclesResult = Variant<{
    ok: nat64;
    err: string;
}>;

type SendCyclesResult128 = Variant<{
    ok: nat;
    err: string;
}>;

// Reports the number of cycles returned from the Cycles canister
$update;
export async function send_cycles(): Promise<SendCyclesResult> {
    const result = await cycles_canister
        .receive_cycles()
        .cycles(1_000_000n)
        .call();

    if (!ok(result)) {
        return { err: result.err };
    }

    return {
        ok: ic.msg_cycles_refunded()
    };
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

    if (!ok(result)) {
        return { err: result.err };
    }

    return {
        ok: ic.msg_cycles_refunded128()
    };
}

$update;
export function send_cycles128_notify(): NotifyResult {
    return cycles_canister.receive_cycles128().cycles128(1_000_000n).notify();
}

$query;
export function get_canister_balance(): nat64 {
    return ic.canister_balance();
}

$query;
export function get_canister_balance128(): nat {
    return ic.canister_balance128();
}
