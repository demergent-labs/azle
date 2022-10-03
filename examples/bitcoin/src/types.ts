import { Variant } from 'azle';
import {
    GetUtxosResult,
    MillisatoshiPerByte,
    Satoshi
} from 'azle/canisters/management';

export type ExecuteGetBalanceResult = Variant<{
    ok: Satoshi;
    err: string;
}>;

export type ExecuteGetCurrentFeePercentiles = Variant<{
    ok: MillisatoshiPerByte[];
    err: string;
}>;

export type ExecuteGetUtxosResult = Variant<{
    ok: GetUtxosResult;
    err: string;
}>;

export type ExecuteSendTransactionResult = Variant<{
    ok: null;
    err: string;
}>;
