import { NotifyResult } from './ic';
import { Alias, Variant, nat64, nat } from './candid_types';
import { RequireExactlyOne } from './candid_types/variant';

export type Result<Ok, Err> = Variant<{
    Ok: Ok;
    Err: Err;
}>;

export const Result = {
    Ok: <Ok, Err>(value: Ok): Result<Ok, Err> => ({
        Ok: value
    }),
    Err: <Ok, Err>(value: Err): Result<Ok, Err> => ({
        Err: value
    })
};

export type CallResult<T> = {
    call: () => Promise<FinalCallResult<T>>;
    notify: () => NotifyResult;
    cycles: (cycles: nat64) => CallResult<T>;
    cycles128: (cycles: nat) => CallResult<T>;
};

export type FinalCallResult<T> = RequireExactlyOne<{
    Ok: T;
    Err: string;
}>;

/** The return type of a guard function. Used to indicate whether the guarded function should halt or proceed. */
export type GuardResult = Alias<Result<null, string>>;
