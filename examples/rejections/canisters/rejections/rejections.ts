import { some_service } from '../some_service';
import {
    Canister,
    CanisterResult,
    ic,
    Principal,
    RejectionCode,
    Update
} from 'azle';

export type Nonexistent = Canister<{
    method(): CanisterResult<void>;
}>;

export const nonexistent_canister: Nonexistent = ic.canisters.Nonexistent(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

export function* get_rejection_code_no_error(): Update<RejectionCode> {
    yield some_service.accept();
    return ic.reject_code();
}

export function* get_rejection_code_destination_invalid(): Update<RejectionCode> {
    yield nonexistent_canister.method();
    return ic.reject_code();
}

export function* get_rejection_code_canister_reject(): Update<RejectionCode> {
    yield some_service.reject('reject');
    return ic.reject_code();
}

export function* get_rejection_code_canister_error(): Update<RejectionCode> {
    yield some_service.error();
    return ic.reject_code();
}

export function* get_rejection_message(message: string): Update<string> {
    yield some_service.reject(message);
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
