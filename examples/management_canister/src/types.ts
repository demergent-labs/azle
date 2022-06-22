import { blob, Variant } from 'azle';
import {
    CreateCanisterResult,
    CanisterStatusResult
} from 'azle/canisters/management';

export type DefaultResult = Variant<{
    ok: boolean;
    err: string;
}>;

export type ExecuteCreateCanisterResult = Variant<{
    ok: CreateCanisterResult;
    err: string;
}>;

export type ExecuteProvisionalCreateCanisterWithCyclesResult = Variant<{
    ok: CreateCanisterResult;
    err: string;
}>;

export type GetCanisterStatusResult = Variant<{
    ok: CanisterStatusResult;
    err: string;
}>;

export type RawRandResult = Variant<{
    ok: blob;
    err: string;
}>;
