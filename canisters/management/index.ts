// Some JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
//
// Some documentation changed from original work.

export * from './bitcoin';
export * from './canister_info';
export * from './canister_management';
export * from './http_request';
export * from './t_ecdsa';

export const PRINCIPAL = 'aaaaa-aa';
export const FUNCS = {
    bitcoin_get_balance: 'bitcoin_get_balance',
    bitcoin_get_current_fee_percentiles: 'bitcoin_get_current_fee_percentiles',
    bitcoin_get_utxos: 'bitcoin_get_utxos',
    bitcoin_send_transaction: 'bitcoin_send_transaction',
    create_canister: 'create_canister',
    update_settings: 'update_settings',
    upload_chunk: 'upload_chunk',
    clear_chunk_store: 'clear_chunk_store',
    stored_chunks: 'stored_chunks',
    install_code: 'install_code',
    install_chunked_code: 'install_chunked_code',
    uninstall_code: 'uninstall_code',
    start_canister: 'start_canister',
    stop_canister: 'stop_canister',
    canister_info: 'canister_info',
    canister_status: 'canister_status',
    delete_canister: 'delete_canister',
    deposit_cycles: 'deposit_cycles',
    provisional_create_canister_with_cycles:
        'provisional_create_canister_with_cycles',
    provisional_top_up_canister: 'provisional_top_up_canister',
    http_request: 'http_request',
    raw_rand: 'raw_rand',
    ecdsa_public_key: 'ecdsa_public_key',
    sign_with_ecdsa: 'sign_with_ecdsa'
};
