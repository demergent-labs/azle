import { blob, Variant } from 'azle';
import {
    CreateCanisterResult,
    CanisterStatusResult
} from 'azle/canisters/management';

export type DefaultResult = Variant<{
    Ok: boolean;
    Err: string;
}>;

export type ExecuteCreateCanisterResult = Variant<{
    Ok: CreateCanisterResult;
    Err: string;
}>;

export type ExecuteProvisionalCreateCanisterWithCyclesResult = Variant<{
    Ok: CreateCanisterResult;
    Err: string;
}>;

export type GetCanisterStatusResult = Variant<{
    Ok: CanisterStatusResult;
    Err: string;
}>;

export type RawRandResult = Variant<{
    Ok: blob;
    Err: string;
}>;
