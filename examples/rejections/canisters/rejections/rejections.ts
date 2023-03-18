import {
    CanisterResult,
    ExternalCanister,
    ic,
    Principal,
    RejectionCode,
    update,
    $update
} from 'azle';
import { someService } from '../some_service';

class Nonexistent extends ExternalCanister {
    @update
    method: () => CanisterResult<void>;
}

export const nonexistentCanister = new Nonexistent(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

$update;
export async function getRejectionCodeNoError(): Promise<RejectionCode> {
    await someService.accept().call();
    return ic.rejectCode();
}

$update;
export async function getRejectionCodeDestinationInvalid(): Promise<RejectionCode> {
    await nonexistentCanister.method().call();
    return ic.rejectCode();
}

$update;
export async function getRejectionCodeCanisterReject(): Promise<RejectionCode> {
    await someService.reject('reject').call();
    return ic.rejectCode();
}

$update;
export async function getRejectionCodeCanisterError(): Promise<RejectionCode> {
    await someService.error().call();
    return ic.rejectCode();
}

$update;
export async function getRejectionMessage(message: string): Promise<string> {
    await someService.reject(message).call();
    return ic.rejectMessage();
}
