import { someService } from '../some_service';
import {
    Canister,
    CanisterResult,
    ic,
    Principal,
    RejectionCode,
    UpdateAsync
} from 'azle';

export type Nonexistent = Canister<{
    method(): CanisterResult<void>;
}>;

export const nonexistentCanister = ic.canisters.Nonexistent<Nonexistent>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

export function* getRejectionCodeNoError(): UpdateAsync<RejectionCode> {
    yield someService.accept();
    return ic.reject_code();
}

export function* getRejectionCodeDestinationInvalid(): UpdateAsync<RejectionCode> {
    yield nonexistentCanister.method();
    return ic.reject_code();
}

export function* getRejectionCodeCanisterReject(): UpdateAsync<RejectionCode> {
    yield someService.reject('reject');
    return ic.reject_code();
}

export function* getRejectionCodeCanisterError(): UpdateAsync<RejectionCode> {
    yield someService.error();
    return ic.reject_code();
}

export function* getRejectionMessage(message: string): UpdateAsync<string> {
    yield someService.reject(message);
    return ic.reject_message();
}
