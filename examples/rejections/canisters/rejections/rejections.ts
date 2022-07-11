import { someService } from '../some_service';
import {
    Canister,
    CanisterResult,
    ic,
    ok,
    Principal,
    RejectionCode,
    UpdateAsync,
    Variant
} from 'azle';

export type Nonexistent = Canister<{
    method(): CanisterResult<void>;
}>;

type GetResultResult = Variant<{
    ok: null;
    err: string;
}>;

type Outcome = Variant<{
    Accept: null;
    Reject: null;
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

// function result() {
//     if ('NoError' in ic.reject_code()) {
//         console.log('Calling ic.arg_data...');
//         return {
//             ok: ic.arg_data()
//         };
//     }

//     console.log('Calling ic.reject_message...');
//     return {
//         err: ic.reject_message()
//     };
// }

function result(canisterResult: any) {
    if ('NoError' in ic.reject_code()) {
        return {
            ok: canisterResult.ok
        };
    }
    return {
        err: ic.reject_message()
    };
}

export function* getResult(
    outcome: Outcome,
    message: string
): UpdateAsync<GetResultResult> {
    console.log('Started executing method body');
    // yield 'Accept' in outcome
    //     ? someService.accept()
    //     : someService.reject(message);
    const canisterResult = yield 'Accept' in outcome
        ? someService.accept()
        : someService.reject(message);

    console.log('Completed cross-canister call');
    // const safeResult = result();
    const safeResult = result(canisterResult);
    // ic.arg_data();
    console.log('Printing out after calling result');

    if (!ok(safeResult)) {
        return {
            err: safeResult.err
        };
    }

    return {
        ok: safeResult.ok[0] ?? null
    };
}
