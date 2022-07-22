import { someService } from '../some_service';
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

export const nonexistentCanister = ic.canisters.Nonexistent<Nonexistent>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

export function* getRejectionCodeNoError(): Update<RejectionCode> {
    yield someService.accept();
    return ic.reject_code();
}

export function* getRejectionCodeDestinationInvalid(): Update<RejectionCode> {
    yield nonexistentCanister.method();
    return ic.reject_code();
}

export function* getRejectionCodeCanisterReject(): Update<RejectionCode> {
    yield someService.reject('reject');
    return ic.reject_code();
}

export function* getRejectionCodeCanisterError(): Update<RejectionCode> {
    yield someService.error();
    return ic.reject_code();
}

export function* getRejectionMessage(message: string): Update<string> {
    yield someService.reject(message);
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
