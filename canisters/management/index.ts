import {
    blob,
    Principal,
    Service,
    update,
    Vec,
    Void
} from '../../src/lib_functional';
import {
    GetBalanceArgs,
    GetCurrentFeePercentilesArgs,
    GetUtxosArgs,
    GetUtxosResult,
    MillisatoshiPerByte,
    Satoshi,
    SendTransactionArgs
} from './bitcoin';

export * from './bitcoin';

export const managementCanister = Service({
    bitcoin_get_balance: update([GetBalanceArgs], Satoshi),
    bitcoin_get_current_fee_percentiles: update(
        [GetCurrentFeePercentilesArgs],
        Vec(MillisatoshiPerByte)
    ),
    bitcoin_get_utxos: update([GetUtxosArgs], GetUtxosResult),
    bitcoin_send_transaction: update([SendTransactionArgs], Void),
    raw_rand: update([], blob)
})(Principal.fromText('aaaaa-aa'));
