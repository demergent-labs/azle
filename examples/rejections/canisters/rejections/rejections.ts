import {
    Canister,
    CanisterResult,
    ic,
    Principal,
    RejectionCode,
    Update
} from 'azle';
import { some_service, some_service_old } from '../some_service';

export type NonexistentOld = Canister<{
    method_(): CanisterResult<void>;
}>;

export const nonexistent_canister_old: NonexistentOld =
    ic.canisters.NonexistentOld(
        Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
    );

export async function get_rejection_code_no_error(): Promise<
    Update<RejectionCode>
> {
    await some_service_old.accept().call();
    return ic.reject_code();
}

export async function get_rejection_code_destination_invalid(): Promise<
    Update<RejectionCode>
> {
    await nonexistent_canister_old.method_().call();
    return ic.reject_code();
}

export async function get_rejection_code_canister_reject(): Promise<
    Update<RejectionCode>
> {
    await some_service_old.reject('reject').call();
    return ic.reject_code();
}

export async function get_rejection_code_canister_error(): Promise<
    Update<RejectionCode>
> {
    await some_service_old.error().call();
    return ic.reject_code();
}

export async function get_rejection_message(
    message: string
): Promise<Update<string>> {
    await some_service_old.reject(message).call();
    return ic.reject_message();
}

// TODO: See https://github.com/demergent-labs/azle/issues/496

// Used for `ic.result` below

// type GetResultResult = Variant<{
//     ok: boolean;
//     err: string;
// }>;

// type Outcome = Variant<{
//     Accept: null;
//     Reject: null;
// }>;

// Working example of `ic.result`. Use in conjunction with function declaration
// in index.ts that take a single parameter.
// This is not the final API that we want, but it works.

// export function* getResult(
//     outcome: Outcome,
//     message: string
// ): Update<GetResultResult> {
//     const canisterResult: Result = yield 'Accept' in outcome
//         ? someService.accept()
//         : someService.reject(message);

//     const safeResult = ic.result(canisterResult);

//     if (!ok(safeResult)) {
//         return {
//             err: safeResult.err
//         };
//     }

//     return {
//         ok: safeResult.ok
//     };
// }

/**
 * Non-working example if `ic.result`. Use in conjunction with function
 * declaration in index.ts that doesn't take any parameters.
 * This is the final API that we want but might be very difficult to implement.
 */
// export function* getResult(
//     outcome: Outcome,
//     message: string
// ): Update<GetResultResult> {
//     yield 'Accept' in outcome
//         ? someService.accept()
//         : someService.reject(message);

//     const wrappedResult = ic.result<boolean>();

//     if (!ok(wrappedResult)) {
//         return {
//             err: wrappedResult.err
//         };
//     }

//     return {
//         ok: wrappedResult.ok[0] ?? null
//     };
// }

// class API

import { ExternalCanister, method, update } from 'azle';

class Nonexistent extends ExternalCanister {
    @method
    method_: () => CanisterResult<void>;
}

export const nonexistent_canister = new Nonexistent(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

export default class {
    @update
    async get_rejection_code_no_error(): Promise<RejectionCode> {
        await some_service.accept().call();
        return ic.reject_code();
    }

    @update
    async get_rejection_code_destination_invalid(): Promise<RejectionCode> {
        await nonexistent_canister.method_().call();
        return ic.reject_code();
    }

    @update
    async get_rejection_code_canister_reject(): Promise<RejectionCode> {
        await some_service.reject('reject').call();
        return ic.reject_code();
    }

    @update
    async get_rejection_code_canister_error(): Promise<RejectionCode> {
        await some_service.error().call();
        return ic.reject_code();
    }

    @update
    async get_rejection_message(message: string): Promise<string> {
        await some_service.reject(message).call();
        return ic.reject_message();
    }
}
