// Some JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
// - https://github.com/dfinity/interface-spec/blob/master/LICENSE
// - https://github.com/dfinity/portal/blob/master/LICENSE
//
// Some documentation changed from original work.

import { NotifyResult } from './ic';
import { Variant, nat64, nat, Service } from './candid_types';

/**
 * Represents either success (`Ok`) or failure (`Err`)
 *
 * @typeParam Ok - The type of the success value
 * @typeParam Err - The type of the error value
 */
export type Result<Ok, Err> = Variant<{
    /** The success value */
    Ok: Ok;
    /** The error value */
    Err: Err;
}>;

export const Result = {
    /**
     * Wraps the provided value in an `Ok` {@link Result}
     * @param value - the success value to be wrapped
     * @returns a successful {@link Result} containing the provided value
     */
    Ok: <Ok, Err>(value: Ok): Result<Ok, Err> => ({
        Ok: value
    }),
    /**
     * Wraps the provided value in an `Err` {@link Result}
     * @param value - the error value to be wrapped
     * @returns an error {@link Result} containing the provided value
     */
    Err: <Ok, Err>(value: Err): Result<Ok, Err> => ({
        Err: value
    })
};

/**
 * An execution context for configuring {@link Service} method calls.
 *
 * Each service method call can await a result ({@link CallResult.call}) or can
 * be sent without awaiting a response ({@link CallResult.notify}).
 *
 * To send cycles with your request first chain either {@link CallResult.cycles}
 * or {@link CallResult.cycles128}.
 */
export type CallResult<T> = {
    /**
     * Dispatches an asynchronous {@link Service} method call and returns a
     * response. If sending cycles, make sure to call {@link CallResult.cycles}
     * or {@link CallResult.cycles128} first.
     *
     * @returns A promise with a result containing the service method return
     * value or an error message
     */
    call: () => Promise<Result<T, string>>;
    /**
     * Dispatches an asynchronous {@link Service} method call without returning
     * a response. If sending cycles, make sure to call
     * {@link CallResult.cycles} or {@link CallResult.cycles128} first.
     *
     * @returns a result indicating whether the call was successfully enqueued,
     * otherwise a reject code
     */
    notify: () => NotifyResult;
    /**
     * Specifies the number of cycles to send with the {@link Service} method
     * call. Must be <= 18_446_744_073_709_551_615 (2^64 - 1). For sending 2^64
     * cycles or more use {@link CallResult.cycles128}.
     *
     * @param cycles - the number of cycles to send with the call
     * @returns a new {@link CallResult} instance with the provided cycle amount
     * stored
     */
    cycles: (cycles: nat64) => CallResult<T>;
    /**
     * Specifies the number of cycles to send with the {@link Service} method
     * call. Must be <= 340_282_366_920_938_463_463_374_607_431_768_211_455
     * (2^128 - 1). For sending fewer than 2^64 cycles use
     * {@link CallResult.cycles} instead.
     *
     * @param cycles - the number of cycles to send with the call
     * @returns the {@link CallResult} instance with the provided cycle amount
     * stored
     */
    cycles128: (cycles: nat) => CallResult<T>;
};

/**
 * The required return type of guard functions. Indicates whether the guarded
 * function should halt or proceed. Functionally equivalent to
 * `Result<null, string>`.
 */
export type GuardResult = Result<null, string>;
