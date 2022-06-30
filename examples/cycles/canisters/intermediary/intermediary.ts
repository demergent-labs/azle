import { cycles } from '../cycles';
import {
    CanisterResult,
    ic,
    nat,
    nat64,
    ok,
    Query,
    Update,
    Variant
} from 'azle';

type SendCyclesResult = Variant<{
    ok: nat64;
    err: string;
}>;

type SendCyclesResult128 = Variant<{
    ok: nat;
    err: string;
}>;

type NotifyResult = Variant<{
    ok: null;
    err: string;
}>;

// Reports the number of cycles returned from the Cycles canister
export function* sendCycles(): Update<SendCyclesResult> {
    const result: CanisterResult<nat64> = yield cycles
        .receiveCycles()
        .with_cycles(1_000_000n);

    if (!ok(result)) {
        return { err: result.err };
    }

    return {
        ok: ic.msg_cycles_refunded()
    };
}

export function sendCyclesNotify(): Update<NotifyResult> {
    return cycles.receiveCycles().with_cycles(1_000_000n).notify();
}

// Reports the number of cycles returned from the Cycles canister
export function* sendCycles128(): Update<SendCyclesResult128> {
    const result: CanisterResult<nat> = yield cycles
        .receiveCycles128()
        .with_cycles128(1_000_000n);

    if (!ok(result)) {
        return { err: result.err };
    }

    return {
        ok: ic.msg_cycles_refunded128()
    };
}

export function sendCycles128Notify(): Update<NotifyResult> {
    return cycles.receiveCycles128().with_cycles128(1_000_000n).notify();
}

export function getCanisterBalance(): Query<nat64> {
    return ic.canister_balance();
}

export function getCanisterBalance128(): Query<nat> {
    return ic.canister_balance128();
}
