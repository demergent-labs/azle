import { cycles } from '../cycles';
import { CanisterResult, ic, nat, nat64, ok, UpdateAsync, Variant } from 'azle';

type ReportRefundResult = Variant<{
    ok: nat64;
    err: string;
}>;

type ReportRefundResult128 = Variant<{
    ok: nat;
    err: string;
}>;

// Reports the number of cycles returned from the Cycles canister
export function* reportRefund(): UpdateAsync<ReportRefundResult> {
    // TODO: This doesn't actually send cycles right now.
    // See https://github.com/demergent-labs/azle/issues/387
    const result: CanisterResult<nat64> = yield cycles.sendCycles();

    if (!ok(result)) {
        return { err: result.err };
    }

    return {
        ok: ic.msg_cycles_refunded()
    };
}

// Reports the number of cycles returned from the Cycles canister
export function* reportRefund128(): UpdateAsync<ReportRefundResult128> {
    // TODO: This doesn't actually send cycles right now.
    // See https://github.com/demergent-labs/azle/issues/387

    const result: CanisterResult<nat> = yield cycles.sendCycles128();

    if (!ok(result)) {
        return { err: result.err };
    }

    return {
        ok: ic.msg_cycles_refunded128()
    };
}
