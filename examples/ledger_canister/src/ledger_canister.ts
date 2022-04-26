import {
    CanisterResult,
    nat32,
    ic,
    UpdateAsync,
    Variant
} from 'azle';
import {
    DecimalsResult,
    Ledger,
    NameResult,
    SymbolResult
} from 'azle/canisters/ledger';

// TODO we should install a local ledger canister
// TODO let's do this with the new test framework, these tests shouldn't be too bad to write
const ICPCanister = ic.canisters.Ledger<Ledger>('');

type GetSymbolResult = Variant<{
    ok?: string;
    err?: string;
}>;

export function* get_symbol(): UpdateAsync<GetSymbolResult> {
    const symbol_result_canister_result: CanisterResult<SymbolResult> = yield ICPCanister.symbol();

    if (symbol_result_canister_result.ok === undefined) {
        return {
            err: symbol_result_canister_result.err
        };
    }

    const symbol_result = symbol_result_canister_result.ok;

    return {
        ok: symbol_result.symbol
    };
}

type GetNameResult = Variant<{
    ok?: string;
    err?: string;
}>;

export function* get_name(): UpdateAsync<GetNameResult> {
    const name_result_canister_result: CanisterResult<NameResult> = yield ICPCanister.symbol();

    if (name_result_canister_result.ok === undefined) {
        return {
            err: name_result_canister_result.err
        };
    }

    const name_result = name_result_canister_result.ok;

    return {
        ok: name_result.name
    };
}

type GetDecimalsResult = Variant<{
    ok?: nat32;
    err?: string;
}>;

export function* get_decimals(): UpdateAsync<GetDecimalsResult> {
    const decimals_result_canister_result: CanisterResult<DecimalsResult> = yield ICPCanister.decimals();

    if (decimals_result_canister_result.ok === undefined) {
        return {
            err: decimals_result_canister_result.err
        };
    }

    const decimals_result = decimals_result_canister_result.ok;

    return {
        ok: decimals_result.decimals
    };
}