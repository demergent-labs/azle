import {
    CanisterResult,
    ExternalCanister,
    ic,
    Principal,
    RejectionCode,
    update,
    $update
} from 'azle';
import { some_service } from '../some_service';

class Nonexistent extends ExternalCanister {
    @update
    method: () => CanisterResult<void>;
}

export const nonexistent_canister = new Nonexistent(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

$update;
export async function get_rejection_code_no_error(): Promise<RejectionCode> {
    await some_service.accept().call();
    return ic.rejectCode();
}

$update;
export async function get_rejection_code_destination_invalid(): Promise<RejectionCode> {
    await nonexistent_canister.method().call();
    return ic.rejectCode();
}

$update;
export async function get_rejection_code_canister_reject(): Promise<RejectionCode> {
    await some_service.reject('reject').call();
    return ic.rejectCode();
}

$update;
export async function get_rejection_code_canister_error(): Promise<RejectionCode> {
    await some_service.error().call();
    return ic.rejectCode();
}

$update;
export async function get_rejection_message(message: string): Promise<string> {
    await some_service.reject(message).call();
    return ic.rejectMessage();
}
