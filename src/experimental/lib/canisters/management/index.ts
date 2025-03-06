import '#experimental/lib/assert_experimental';

// Some JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
//
// Some documentation changed from original work.
import { blob } from '#experimental/lib/candid/types/constructed/blob';
import { Vec } from '#experimental/lib/candid/types/constructed/vec';
import { Void } from '#experimental/lib/candid/types/primitive/void';
import { Principal } from '#experimental/lib/candid/types/reference/principal';
import { Canister } from '#experimental/lib/candid/types/reference/service/index';
import { update } from '#experimental/lib/canister_methods/methods/update';

import {
    GetBalanceArgs,
    GetCurrentFeePercentilesArgs,
    GetUtxosArgs,
    GetUtxosResult,
    MillisatoshiPerByte,
    Satoshi,
    SendTransactionArgs
} from './bitcoin';
import { CanisterInfoArgs, CanisterInfoResult } from './canister_info';
import {
    CanisterStatusArgs,
    CanisterStatusResult,
    ClearChunkStoreArgs,
    CreateCanisterArgs,
    CreateCanisterResult,
    DeleteCanisterArgs,
    DepositCyclesArgs,
    InstallChunkedCodeArgs,
    InstallCodeArgs,
    ProvisionalCreateCanisterWithCyclesArgs,
    ProvisionalCreateCanisterWithCyclesResult,
    ProvisionalTopUpCanisterArgs,
    StartCanisterArgs,
    StopCanisterArgs,
    StoredChunksArgs,
    StoredChunksResult,
    UninstallCodeArgs,
    UpdateSettingsArgs,
    UploadChunkArgs,
    UploadChunkResult
} from './canister_management';
import { HttpRequestArgs, HttpResponse } from './http_request';
import {
    EcdsaPublicKeyArgs,
    EcdsaPublicKeyResult,
    SignWithEcdsaArgs,
    SignWithEcdsaResult
} from './t_ecdsa';

export * from './bitcoin';
export * from './canister_info';
export * from './canister_management';
export * from './http_request';
export * from './t_ecdsa';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const managementCanister = Canister({
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
    upload_chunk: update([UploadChunkArgs], UploadChunkResult),
    clear_chunk_store: update([ClearChunkStoreArgs], Void),
    stored_chunks: update([StoredChunksArgs], StoredChunksResult),
    install_code: update([InstallCodeArgs], Void),
    install_chunked_code: update([InstallChunkedCodeArgs], Void),
    uninstall_code: update([UninstallCodeArgs], Void),
    start_canister: update([StartCanisterArgs], Void),
    stop_canister: update([StopCanisterArgs], Void),
    /** Get public information about the canister. */
    canister_info: update([CanisterInfoArgs], CanisterInfoResult),
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
    raw_rand: update([], blob),
    // tEcdsa
    ecdsa_public_key: update([EcdsaPublicKeyArgs], EcdsaPublicKeyResult),
    sign_with_ecdsa: update([SignWithEcdsaArgs], SignWithEcdsaResult)
})(Principal.fromText('aaaaa-aa'));
