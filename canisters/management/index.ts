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
import {
    CanisterStatusArgs,
    CanisterStatusResult,
    CreateCanisterArgs,
    CreateCanisterResult,
    DeleteCanisterArgs,
    DepositCyclesArgs,
    InstallCodeArgs,
    ProvisionalCreateCanisterWithCyclesArgs,
    ProvisionalCreateCanisterWithCyclesResult,
    ProvisionalTopUpCanisterArgs,
    StartCanisterArgs,
    StopCanisterArgs,
    UninstallCodeArgs,
    UpdateSettingsArgs
} from './canister_management';
import { HttpRequestArgs, HttpResponse } from './http_request';

export * from './bitcoin';
export * from './canister_management';
export * from './http_request';

export const managementCanister = Service({
    // bitcoin
    bitcoin_get_balance: update([GetBalanceArgs], Satoshi),
    bitcoin_get_current_fee_percentiles: update(
        [GetCurrentFeePercentilesArgs],
        Vec(MillisatoshiPerByte)
    ),
    bitcoin_get_utxos: update([GetUtxosArgs], GetUtxosResult),
    bitcoin_send_transaction: update([SendTransactionArgs], Void),
    // canister management
    create_canister: update([CreateCanisterArgs], CreateCanisterResult),
    update_settings: update([UpdateSettingsArgs], Void),
    install_code: update([InstallCodeArgs], Void),
    uninstall_code: update([UninstallCodeArgs], Void),
    start_canister: update([StartCanisterArgs], Void),
    stop_canister: update([StopCanisterArgs], Void),
    canister_status: update([CanisterStatusArgs], CanisterStatusResult),
    delete_canister: update([DeleteCanisterArgs], Void),
    deposit_cycles: update([DepositCyclesArgs], Void),
    provisional_create_canister_with_cycles: update(
        [ProvisionalCreateCanisterWithCyclesArgs],
        ProvisionalCreateCanisterWithCyclesResult
    ),
    provisional_top_up_canister: update([ProvisionalTopUpCanisterArgs], Void),
    // http
    http_request: update([HttpRequestArgs], HttpResponse),
    // randomness
    raw_rand: update([], blob)
})(Principal.fromText('aaaaa-aa'));
