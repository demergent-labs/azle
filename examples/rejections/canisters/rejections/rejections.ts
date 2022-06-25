import { someService } from '../some_service';
import {
    Canister,
    CanisterResult,
    ic,
    Principal,
    RejectionCode,
    UpdateAsync,
    Variant
} from 'azle';

type RejectCodeResult = Variant<{
    ok: RejectionCode;
    err: string;
}>;

export type Nonexistent = Canister<{
    method(): CanisterResult<void>;
}>;

export const nonexistentCanister = ic.canisters.Nonexistent<Nonexistent>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

export function* getRejectionCodeNoError(): UpdateAsync<RejectCodeResult> {
    yield someService.accept();
    return {
        ok: ic.reject_code()
    };
}

export function* getRejectionCodeDestinationInvalid(): UpdateAsync<RejectCodeResult> {
    yield nonexistentCanister.method();
    return {
        ok: ic.reject_code()
    };
}

export function* getRejectionCodeCanisterReject(
    message: string
): UpdateAsync<RejectCodeResult> {
    yield someService.reject(message);
    return {
        ok: ic.reject_code()
    };
}

export function* getRejectionCodeCanisterError(): UpdateAsync<RejectCodeResult> {
    yield someService.error();
    return {
        ok: ic.reject_code()
    };
}
