import { ic, nat, nat64, NotifyResult, ok, Query, Update, Variant } from 'azle';
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
export async function send_cycles(): Promise<Update<SendCyclesResult>> {
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

export function send_cycles_notify(): Update<NotifyResult> {
    return cycles_canister.receive_cycles().cycles(1_000_000n).notify();
}

// Reports the number of cycles returned from the Cycles canister
export async function send_cycles128(): Promise<Update<SendCyclesResult128>> {
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

export function send_cycles128_notify(): Update<NotifyResult> {
    return cycles_canister.receive_cycles128().cycles128(1_000_000n).notify();
}

export function get_canister_balance(): Query<nat64> {
    return ic.canister_balance();
}

export function get_canister_balance128(): Query<nat> {
    return ic.canister_balance128();
}

// class API

import { query, update } from 'azle';

export default class {
    // Reports the number of cycles returned from the Cycles canister
    @update
    async send_cycles(): Promise<SendCyclesResult> {
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

    @update
    send_cycles_notify(): NotifyResult {
        return cycles_canister.receive_cycles().cycles(1_000_000n).notify();
    }

    // Reports the number of cycles returned from the Cycles canister
    @update
    async send_cycles128(): Promise<SendCyclesResult128> {
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

    @update
    send_cycles128_notify(): NotifyResult {
        return cycles_canister
            .receive_cycles128()
            .cycles128(1_000_000n)
            .notify();
    }

    @query
    get_canister_balance(): nat64 {
        return ic.canister_balance();
    }

    @query
    get_canister_balance128(): nat {
        return ic.canister_balance128();
    }
}
