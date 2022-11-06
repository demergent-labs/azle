import {
    CanisterResult,
    ic,
    nat,
    nat64,
    NotifyResult,
    ok,
    Query,
    Update,
    Variant
} from 'azle';
import { cycles } from '../cycles';

type SendCyclesResult = Variant<{
    ok: nat64;
    err: string;
}>;

type SendCyclesResult128 = Variant<{
    ok: nat;
    err: string;
}>;

// Reports the number of cycles returned from the Cycles canister
export function* send_cycles(): Update<SendCyclesResult> {
    const result: CanisterResult<nat64> = yield cycles
        .receive_cycles()
        .with_cycles(1_000_000n);

    if (!ok(result)) {
        return { err: result.err };
    }

    return {
        ok: ic.msg_cycles_refunded()
    };
}

export function send_cycles_notify(): Update<NotifyResult> {
    return cycles.receive_cycles().with_cycles(1_000_000n).notify();
}

// Reports the number of cycles returned from the Cycles canister
export function* send_cycles128(): Update<SendCyclesResult128> {
    const result: CanisterResult<nat> = yield cycles
        .receive_cycles128()
        .with_cycles128(1_000_000n);

    if (!ok(result)) {
        return { err: result.err };
    }

    return {
        ok: ic.msg_cycles_refunded128()
    };
}

export function send_cycles128_notify(): Update<NotifyResult> {
    return cycles.receive_cycles128().with_cycles128(1_000_000n).notify();
}

export function get_canister_balance(): Query<nat64> {
    return ic.canister_balance();
}

export function get_canister_balance128(): Query<nat> {
    return ic.canister_balance128();
}
