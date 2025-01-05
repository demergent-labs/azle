import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export type bitcoin_address = string;
export type bitcoin_block_hash = Uint8Array | number[];
export type bitcoin_block_header = Uint8Array | number[];
export type bitcoin_block_height = number;
export interface bitcoin_get_balance_args {
    network: bitcoin_network;
    address: bitcoin_address;
    min_confirmations: [] | [number];
}
export type bitcoin_get_balance_result = satoshi;
export interface bitcoin_get_block_headers_args {
    start_height: bitcoin_block_height;
    end_height: [] | [bitcoin_block_height];
    network: bitcoin_network;
}
export interface bitcoin_get_block_headers_result {
    tip_height: bitcoin_block_height;
    block_headers: Array<bitcoin_block_header>;
}
export interface bitcoin_get_current_fee_percentiles_args {
    network: bitcoin_network;
}
export type bitcoin_get_current_fee_percentiles_result =
    | BigUint64Array
    | bigint[];
export interface bitcoin_get_utxos_args {
    network: bitcoin_network;
    filter:
        | []
        | [{ page: Uint8Array | number[] } | { min_confirmations: number }];
    address: bitcoin_address;
}
export interface bitcoin_get_utxos_result {
    next_page: [] | [Uint8Array | number[]];
    tip_height: bitcoin_block_height;
    tip_block_hash: bitcoin_block_hash;
    utxos: Array<utxo>;
}
export type bitcoin_network =
    | { mainnet: null }
    | { regtest: null }
    | { testnet: null };
export interface bitcoin_send_transaction_args {
    transaction: Uint8Array | number[];
    network: bitcoin_network;
}
export type canister_id = Principal;
export interface canister_info_args {
    canister_id: canister_id;
    num_requested_changes: [] | [bigint];
}
export interface canister_info_result {
    controllers: Array<Principal>;
    module_hash: [] | [Uint8Array | number[]];
    recent_changes: Array<change>;
    total_num_changes: bigint;
}
export type canister_install_mode =
    | { reinstall: null }
    | {
          upgrade:
              | []
              | [
                    {
                        wasm_memory_persistence:
                            | []
                            | [{ keep: null } | { replace: null }];
                        skip_pre_upgrade: [] | [boolean];
                    }
                ];
      }
    | { install: null };
export interface canister_log_record {
    idx: bigint;
    timestamp_nanos: bigint;
    content: Uint8Array | number[];
}
export interface canister_settings {
    freezing_threshold: [] | [bigint];
    controllers: [] | [Array<Principal>];
    reserved_cycles_limit: [] | [bigint];
    log_visibility: [] | [log_visibility];
    wasm_memory_limit: [] | [bigint];
    memory_allocation: [] | [bigint];
    compute_allocation: [] | [bigint];
}
export interface canister_status_args {
    canister_id: canister_id;
}
export interface canister_status_result {
    status: { stopped: null } | { stopping: null } | { running: null };
    memory_size: bigint;
    cycles: bigint;
    settings: definite_canister_settings;
    query_stats: {
        response_payload_bytes_total: bigint;
        num_instructions_total: bigint;
        num_calls_total: bigint;
        request_payload_bytes_total: bigint;
    };
    idle_cycles_burned_per_day: bigint;
    module_hash: [] | [Uint8Array | number[]];
    reserved_cycles: bigint;
}
export interface change {
    timestamp_nanos: bigint;
    canister_version: bigint;
    origin: change_origin;
    details: change_details;
}
export type change_details =
    | {
          creation: { controllers: Array<Principal> };
      }
    | {
          code_deployment: {
              mode: { reinstall: null } | { upgrade: null } | { install: null };
              module_hash: Uint8Array | number[];
          };
      }
    | {
          load_snapshot: {
              canister_version: bigint;
              taken_at_timestamp: bigint;
              snapshot_id: snapshot_id;
          };
      }
    | { controllers_change: { controllers: Array<Principal> } }
    | { code_uninstall: null };
export type change_origin =
    | { from_user: { user_id: Principal } }
    | {
          from_canister: {
              canister_version: [] | [bigint];
              canister_id: Principal;
          };
      };
export interface chunk_hash {
    hash: Uint8Array | number[];
}
export interface clear_chunk_store_args {
    canister_id: canister_id;
}
export interface create_canister_args {
    settings: [] | [canister_settings];
    sender_canister_version: [] | [bigint];
}
export interface create_canister_result {
    canister_id: canister_id;
}
export interface definite_canister_settings {
    freezing_threshold: bigint;
    controllers: Array<Principal>;
    reserved_cycles_limit: bigint;
    log_visibility: log_visibility;
    wasm_memory_limit: bigint;
    memory_allocation: bigint;
    compute_allocation: bigint;
}
export interface delete_canister_args {
    canister_id: canister_id;
}
export interface delete_canister_snapshot_args {
    canister_id: canister_id;
    snapshot_id: snapshot_id;
}
export interface deposit_cycles_args {
    canister_id: canister_id;
}
export type ecdsa_curve = { secp256k1: null };
export interface ecdsa_public_key_args {
    key_id: { name: string; curve: ecdsa_curve };
    canister_id: [] | [canister_id];
    derivation_path: Array<Uint8Array | number[]>;
}
export interface ecdsa_public_key_result {
    public_key: Uint8Array | number[];
    chain_code: Uint8Array | number[];
}
export interface fetch_canister_logs_args {
    canister_id: canister_id;
}
export interface fetch_canister_logs_result {
    canister_log_records: Array<canister_log_record>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_args {
    url: string;
    method: { get: null } | { head: null } | { post: null };
    max_response_bytes: [] | [bigint];
    body: [] | [Uint8Array | number[]];
    transform: [] | [http_transform];
    headers: Array<http_header>;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array | number[];
    headers: Array<http_header>;
}
export interface http_transform {
    function: [Principal, string];
    context: Uint8Array | number[];
}
export interface http_transform_args {
    context: Uint8Array | number[];
    response: http_request_result;
}
export interface install_chunked_code_args {
    arg: Uint8Array | number[];
    wasm_module_hash: Uint8Array | number[];
    mode: canister_install_mode;
    chunk_hashes_list: Array<chunk_hash>;
    target_canister: canister_id;
    store_canister: [] | [canister_id];
    sender_canister_version: [] | [bigint];
}
export interface install_code_args {
    arg: Uint8Array | number[];
    wasm_module: wasm_module;
    mode: canister_install_mode;
    canister_id: canister_id;
    sender_canister_version: [] | [bigint];
}
export interface list_canister_snapshots_args {
    canister_id: canister_id;
}
export type list_canister_snapshots_result = Array<snapshot>;
export interface load_canister_snapshot_args {
    canister_id: canister_id;
    sender_canister_version: [] | [bigint];
    snapshot_id: snapshot_id;
}
export type log_visibility =
    | { controllers: null }
    | { public: null }
    | { allowed_viewers: Array<Principal> };
export type millisatoshi_per_byte = bigint;
export interface node_metrics {
    num_block_failures_total: bigint;
    node_id: Principal;
    num_blocks_proposed_total: bigint;
}
export interface node_metrics_history_args {
    start_at_timestamp_nanos: bigint;
    subnet_id: Principal;
}
export type node_metrics_history_result = Array<{
    timestamp_nanos: bigint;
    node_metrics: Array<node_metrics>;
}>;
export interface outpoint {
    txid: Uint8Array | number[];
    vout: number;
}
export interface provisional_create_canister_with_cycles_args {
    settings: [] | [canister_settings];
    specified_id: [] | [canister_id];
    amount: [] | [bigint];
    sender_canister_version: [] | [bigint];
}
export interface provisional_create_canister_with_cycles_result {
    canister_id: canister_id;
}
export interface provisional_top_up_canister_args {
    canister_id: canister_id;
    amount: bigint;
}
export type raw_rand_result = Uint8Array | number[];
export type satoshi = bigint;
export type schnorr_algorithm = { ed25519: null } | { bip340secp256k1: null };
export interface schnorr_public_key_args {
    key_id: { algorithm: schnorr_algorithm; name: string };
    canister_id: [] | [canister_id];
    derivation_path: Array<Uint8Array | number[]>;
}
export interface schnorr_public_key_result {
    public_key: Uint8Array | number[];
    chain_code: Uint8Array | number[];
}
export interface sign_with_ecdsa_args {
    key_id: { name: string; curve: ecdsa_curve };
    derivation_path: Array<Uint8Array | number[]>;
    message_hash: Uint8Array | number[];
}
export interface sign_with_ecdsa_result {
    signature: Uint8Array | number[];
}
export interface sign_with_schnorr_args {
    key_id: { algorithm: schnorr_algorithm; name: string };
    derivation_path: Array<Uint8Array | number[]>;
    message: Uint8Array | number[];
}
export interface sign_with_schnorr_result {
    signature: Uint8Array | number[];
}
export interface snapshot {
    id: snapshot_id;
    total_size: bigint;
    taken_at_timestamp: bigint;
}
export type snapshot_id = Uint8Array | number[];
export interface start_canister_args {
    canister_id: canister_id;
}
export interface stop_canister_args {
    canister_id: canister_id;
}
export interface stored_chunks_args {
    canister_id: canister_id;
}
export type stored_chunks_result = Array<chunk_hash>;
export interface subnet_info_args {
    subnet_id: Principal;
}
export interface subnet_info_result {
    replica_version: string;
}
export interface take_canister_snapshot_args {
    replace_snapshot: [] | [snapshot_id];
    canister_id: canister_id;
}
export type take_canister_snapshot_result = snapshot;
export interface uninstall_code_args {
    canister_id: canister_id;
    sender_canister_version: [] | [bigint];
}
export interface update_settings_args {
    canister_id: Principal;
    settings: canister_settings;
    sender_canister_version: [] | [bigint];
}
export interface upload_chunk_args {
    chunk: Uint8Array | number[];
    canister_id: Principal;
}
export type upload_chunk_result = chunk_hash;
export interface utxo {
    height: number;
    value: satoshi;
    outpoint: outpoint;
}
export type wasm_module = Uint8Array | number[];
export interface _SERVICE {
    bitcoin_get_balance: ActorMethod<
        [bitcoin_get_balance_args],
        bitcoin_get_balance_result
    >;
    bitcoin_get_block_headers: ActorMethod<
        [bitcoin_get_block_headers_args],
        bitcoin_get_block_headers_result
    >;
    bitcoin_get_current_fee_percentiles: ActorMethod<
        [bitcoin_get_current_fee_percentiles_args],
        bitcoin_get_current_fee_percentiles_result
    >;
    bitcoin_get_utxos: ActorMethod<
        [bitcoin_get_utxos_args],
        bitcoin_get_utxos_result
    >;
    bitcoin_send_transaction: ActorMethod<
        [bitcoin_send_transaction_args],
        undefined
    >;
    canister_info: ActorMethod<[canister_info_args], canister_info_result>;
    canister_status: ActorMethod<
        [canister_status_args],
        canister_status_result
    >;
    clear_chunk_store: ActorMethod<[clear_chunk_store_args], undefined>;
    create_canister: ActorMethod<
        [create_canister_args],
        create_canister_result
    >;
    delete_canister: ActorMethod<[delete_canister_args], undefined>;
    delete_canister_snapshot: ActorMethod<
        [delete_canister_snapshot_args],
        undefined
    >;
    deposit_cycles: ActorMethod<[deposit_cycles_args], undefined>;
    ecdsa_public_key: ActorMethod<
        [ecdsa_public_key_args],
        ecdsa_public_key_result
    >;
    fetch_canister_logs: ActorMethod<
        [fetch_canister_logs_args],
        fetch_canister_logs_result
    >;
    http_request: ActorMethod<[http_request_args], http_request_result>;
    install_chunked_code: ActorMethod<[install_chunked_code_args], undefined>;
    install_code: ActorMethod<[install_code_args], undefined>;
    list_canister_snapshots: ActorMethod<
        [list_canister_snapshots_args],
        list_canister_snapshots_result
    >;
    load_canister_snapshot: ActorMethod<
        [load_canister_snapshot_args],
        undefined
    >;
    node_metrics_history: ActorMethod<
        [node_metrics_history_args],
        node_metrics_history_result
    >;
    provisional_create_canister_with_cycles: ActorMethod<
        [provisional_create_canister_with_cycles_args],
        provisional_create_canister_with_cycles_result
    >;
    provisional_top_up_canister: ActorMethod<
        [provisional_top_up_canister_args],
        undefined
    >;
    raw_rand: ActorMethod<[], raw_rand_result>;
    schnorr_public_key: ActorMethod<
        [schnorr_public_key_args],
        schnorr_public_key_result
    >;
    sign_with_ecdsa: ActorMethod<
        [sign_with_ecdsa_args],
        sign_with_ecdsa_result
    >;
    sign_with_schnorr: ActorMethod<
        [sign_with_schnorr_args],
        sign_with_schnorr_result
    >;
    start_canister: ActorMethod<[start_canister_args], undefined>;
    stop_canister: ActorMethod<[stop_canister_args], undefined>;
    stored_chunks: ActorMethod<[stored_chunks_args], stored_chunks_result>;
    subnet_info: ActorMethod<[subnet_info_args], subnet_info_result>;
    take_canister_snapshot: ActorMethod<
        [take_canister_snapshot_args],
        take_canister_snapshot_result
    >;
    uninstall_code: ActorMethod<[uninstall_code_args], undefined>;
    update_settings: ActorMethod<[update_settings_args], undefined>;
    upload_chunk: ActorMethod<[upload_chunk_args], upload_chunk_result>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const bitcoin_network = IDL.Variant({
    mainnet: IDL.Null,
    regtest: IDL.Null,
    testnet: IDL.Null
});
export const bitcoin_address = IDL.Text;
export const bitcoin_get_balance_args = IDL.Record({
    network: bitcoin_network,
    address: bitcoin_address,
    min_confirmations: IDL.Opt(IDL.Nat32)
});
export const satoshi = IDL.Nat64;
export const bitcoin_get_balance_result = satoshi;
export const bitcoin_block_height = IDL.Nat32;
export const bitcoin_get_block_headers_args = IDL.Record({
    start_height: bitcoin_block_height,
    end_height: IDL.Opt(bitcoin_block_height),
    network: bitcoin_network
});
export const bitcoin_block_header = IDL.Vec(IDL.Nat8);
export const bitcoin_get_block_headers_result = IDL.Record({
    tip_height: bitcoin_block_height,
    block_headers: IDL.Vec(bitcoin_block_header)
});
export const bitcoin_get_current_fee_percentiles_args = IDL.Record({
    network: bitcoin_network
});
export const millisatoshi_per_byte = IDL.Nat64;
export const bitcoin_get_current_fee_percentiles_result = IDL.Vec(
    millisatoshi_per_byte
);
export const bitcoin_get_utxos_args = IDL.Record({
    network: bitcoin_network,
    filter: IDL.Opt(
        IDL.Variant({ page: IDL.Vec(IDL.Nat8), min_confirmations: IDL.Nat32 })
    ),
    address: bitcoin_address
});
export const bitcoin_block_hash = IDL.Vec(IDL.Nat8);
export const outpoint = IDL.Record({
    txid: IDL.Vec(IDL.Nat8),
    vout: IDL.Nat32
});
export const utxo = IDL.Record({
    height: IDL.Nat32,
    value: satoshi,
    outpoint: outpoint
});
export const bitcoin_get_utxos_result = IDL.Record({
    next_page: IDL.Opt(IDL.Vec(IDL.Nat8)),
    tip_height: bitcoin_block_height,
    tip_block_hash: bitcoin_block_hash,
    utxos: IDL.Vec(utxo)
});
export const bitcoin_send_transaction_args = IDL.Record({
    transaction: IDL.Vec(IDL.Nat8),
    network: bitcoin_network
});
export const canister_id = IDL.Principal;
export const canister_info_args = IDL.Record({
    canister_id: canister_id,
    num_requested_changes: IDL.Opt(IDL.Nat64)
});
export const change_origin = IDL.Variant({
    from_user: IDL.Record({ user_id: IDL.Principal }),
    from_canister: IDL.Record({
        canister_version: IDL.Opt(IDL.Nat64),
        canister_id: IDL.Principal
    })
});
export const snapshot_id = IDL.Vec(IDL.Nat8);
export const change_details = IDL.Variant({
    creation: IDL.Record({ controllers: IDL.Vec(IDL.Principal) }),
    code_deployment: IDL.Record({
        mode: IDL.Variant({
            reinstall: IDL.Null,
            upgrade: IDL.Null,
            install: IDL.Null
        }),
        module_hash: IDL.Vec(IDL.Nat8)
    }),
    load_snapshot: IDL.Record({
        canister_version: IDL.Nat64,
        taken_at_timestamp: IDL.Nat64,
        snapshot_id: snapshot_id
    }),
    controllers_change: IDL.Record({ controllers: IDL.Vec(IDL.Principal) }),
    code_uninstall: IDL.Null
});
export const change = IDL.Record({
    timestamp_nanos: IDL.Nat64,
    canister_version: IDL.Nat64,
    origin: change_origin,
    details: change_details
});
export const canister_info_result = IDL.Record({
    controllers: IDL.Vec(IDL.Principal),
    module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
    recent_changes: IDL.Vec(change),
    total_num_changes: IDL.Nat64
});
export const canister_status_args = IDL.Record({ canister_id: canister_id });
export const log_visibility = IDL.Variant({
    controllers: IDL.Null,
    public: IDL.Null,
    allowed_viewers: IDL.Vec(IDL.Principal)
});
export const definite_canister_settings = IDL.Record({
    freezing_threshold: IDL.Nat,
    controllers: IDL.Vec(IDL.Principal),
    reserved_cycles_limit: IDL.Nat,
    log_visibility: log_visibility,
    wasm_memory_limit: IDL.Nat,
    memory_allocation: IDL.Nat,
    compute_allocation: IDL.Nat
});
export const canister_status_result = IDL.Record({
    status: IDL.Variant({
        stopped: IDL.Null,
        stopping: IDL.Null,
        running: IDL.Null
    }),
    memory_size: IDL.Nat,
    cycles: IDL.Nat,
    settings: definite_canister_settings,
    query_stats: IDL.Record({
        response_payload_bytes_total: IDL.Nat,
        num_instructions_total: IDL.Nat,
        num_calls_total: IDL.Nat,
        request_payload_bytes_total: IDL.Nat
    }),
    idle_cycles_burned_per_day: IDL.Nat,
    module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
    reserved_cycles: IDL.Nat
});
export const clear_chunk_store_args = IDL.Record({
    canister_id: canister_id
});
export const canister_settings = IDL.Record({
    freezing_threshold: IDL.Opt(IDL.Nat),
    controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
    reserved_cycles_limit: IDL.Opt(IDL.Nat),
    log_visibility: IDL.Opt(log_visibility),
    wasm_memory_limit: IDL.Opt(IDL.Nat),
    memory_allocation: IDL.Opt(IDL.Nat),
    compute_allocation: IDL.Opt(IDL.Nat)
});
export const create_canister_args = IDL.Record({
    settings: IDL.Opt(canister_settings),
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export const create_canister_result = IDL.Record({
    canister_id: canister_id
});
export const delete_canister_args = IDL.Record({ canister_id: canister_id });
export const delete_canister_snapshot_args = IDL.Record({
    canister_id: canister_id,
    snapshot_id: snapshot_id
});
export const deposit_cycles_args = IDL.Record({ canister_id: canister_id });
export const ecdsa_curve = IDL.Variant({ secp256k1: IDL.Null });
export const ecdsa_public_key_args = IDL.Record({
    key_id: IDL.Record({ name: IDL.Text, curve: ecdsa_curve }),
    canister_id: IDL.Opt(canister_id),
    derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8))
});
export const ecdsa_public_key_result = IDL.Record({
    public_key: IDL.Vec(IDL.Nat8),
    chain_code: IDL.Vec(IDL.Nat8)
});
export const fetch_canister_logs_args = IDL.Record({
    canister_id: canister_id
});
export const canister_log_record = IDL.Record({
    idx: IDL.Nat64,
    timestamp_nanos: IDL.Nat64,
    content: IDL.Vec(IDL.Nat8)
});
export const fetch_canister_logs_result = IDL.Record({
    canister_log_records: IDL.Vec(canister_log_record)
});
export const http_header = IDL.Record({
    value: IDL.Text,
    name: IDL.Text
});
export const http_request_result = IDL.Record({
    status: IDL.Nat,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(http_header)
});
export const http_transform_args = IDL.Record({
    context: IDL.Vec(IDL.Nat8),
    response: http_request_result
});
export const http_transform = IDL.Record({
    function: IDL.Func([http_transform_args], [http_request_result], ['query']),
    context: IDL.Vec(IDL.Nat8)
});
export const http_request_args = IDL.Record({
    url: IDL.Text,
    method: IDL.Variant({
        get: IDL.Null,
        head: IDL.Null,
        post: IDL.Null
    }),
    max_response_bytes: IDL.Opt(IDL.Nat64),
    body: IDL.Opt(IDL.Vec(IDL.Nat8)),
    transform: IDL.Opt(http_transform),
    headers: IDL.Vec(http_header)
});
export const canister_install_mode = IDL.Variant({
    reinstall: IDL.Null,
    upgrade: IDL.Opt(
        IDL.Record({
            wasm_memory_persistence: IDL.Opt(
                IDL.Variant({ keep: IDL.Null, replace: IDL.Null })
            ),
            skip_pre_upgrade: IDL.Opt(IDL.Bool)
        })
    ),
    install: IDL.Null
});
export const chunk_hash = IDL.Record({ hash: IDL.Vec(IDL.Nat8) });
export const install_chunked_code_args = IDL.Record({
    arg: IDL.Vec(IDL.Nat8),
    wasm_module_hash: IDL.Vec(IDL.Nat8),
    mode: canister_install_mode,
    chunk_hashes_list: IDL.Vec(chunk_hash),
    target_canister: canister_id,
    store_canister: IDL.Opt(canister_id),
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export const wasm_module = IDL.Vec(IDL.Nat8);
export const install_code_args = IDL.Record({
    arg: IDL.Vec(IDL.Nat8),
    wasm_module: wasm_module,
    mode: canister_install_mode,
    canister_id: canister_id,
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export const list_canister_snapshots_args = IDL.Record({
    canister_id: canister_id
});
export const snapshot = IDL.Record({
    id: snapshot_id,
    total_size: IDL.Nat64,
    taken_at_timestamp: IDL.Nat64
});
export const list_canister_snapshots_result = IDL.Vec(snapshot);
export const load_canister_snapshot_args = IDL.Record({
    canister_id: canister_id,
    sender_canister_version: IDL.Opt(IDL.Nat64),
    snapshot_id: snapshot_id
});
export const node_metrics_history_args = IDL.Record({
    start_at_timestamp_nanos: IDL.Nat64,
    subnet_id: IDL.Principal
});
export const node_metrics = IDL.Record({
    num_block_failures_total: IDL.Nat64,
    node_id: IDL.Principal,
    num_blocks_proposed_total: IDL.Nat64
});
export const node_metrics_history_result = IDL.Vec(
    IDL.Record({
        timestamp_nanos: IDL.Nat64,
        node_metrics: IDL.Vec(node_metrics)
    })
);
export const provisional_create_canister_with_cycles_args = IDL.Record({
    settings: IDL.Opt(canister_settings),
    specified_id: IDL.Opt(canister_id),
    amount: IDL.Opt(IDL.Nat),
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export const provisional_create_canister_with_cycles_result = IDL.Record({
    canister_id: canister_id
});
export const provisional_top_up_canister_args = IDL.Record({
    canister_id: canister_id,
    amount: IDL.Nat
});
export const raw_rand_result = IDL.Vec(IDL.Nat8);
export const schnorr_algorithm = IDL.Variant({
    ed25519: IDL.Null,
    bip340secp256k1: IDL.Null
});
export const schnorr_public_key_args = IDL.Record({
    key_id: IDL.Record({ algorithm: schnorr_algorithm, name: IDL.Text }),
    canister_id: IDL.Opt(canister_id),
    derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8))
});
export const schnorr_public_key_result = IDL.Record({
    public_key: IDL.Vec(IDL.Nat8),
    chain_code: IDL.Vec(IDL.Nat8)
});
export const sign_with_ecdsa_args = IDL.Record({
    key_id: IDL.Record({ name: IDL.Text, curve: ecdsa_curve }),
    derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)),
    message_hash: IDL.Vec(IDL.Nat8)
});
export const sign_with_ecdsa_result = IDL.Record({
    signature: IDL.Vec(IDL.Nat8)
});
export const sign_with_schnorr_args = IDL.Record({
    key_id: IDL.Record({ algorithm: schnorr_algorithm, name: IDL.Text }),
    derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)),
    message: IDL.Vec(IDL.Nat8)
});
export const sign_with_schnorr_result = IDL.Record({
    signature: IDL.Vec(IDL.Nat8)
});
export const start_canister_args = IDL.Record({ canister_id: canister_id });
export const stop_canister_args = IDL.Record({ canister_id: canister_id });
export const stored_chunks_args = IDL.Record({ canister_id: canister_id });
export const stored_chunks_result = IDL.Vec(chunk_hash);
export const subnet_info_args = IDL.Record({ subnet_id: IDL.Principal });
export const subnet_info_result = IDL.Record({ replica_version: IDL.Text });
export const take_canister_snapshot_args = IDL.Record({
    replace_snapshot: IDL.Opt(snapshot_id),
    canister_id: canister_id
});
export const take_canister_snapshot_result = snapshot;
export const uninstall_code_args = IDL.Record({
    canister_id: canister_id,
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export const update_settings_args = IDL.Record({
    canister_id: IDL.Principal,
    settings: canister_settings,
    sender_canister_version: IDL.Opt(IDL.Nat64)
});
export const upload_chunk_args = IDL.Record({
    chunk: IDL.Vec(IDL.Nat8),
    canister_id: IDL.Principal
});
export const upload_chunk_result = chunk_hash;
export const idlFactory: idlFactory = ({ IDL }) => {
    const bitcoin_network = IDL.Variant({
        mainnet: IDL.Null,
        regtest: IDL.Null,
        testnet: IDL.Null
    });
    const bitcoin_address = IDL.Text;
    const bitcoin_get_balance_args = IDL.Record({
        network: bitcoin_network,
        address: bitcoin_address,
        min_confirmations: IDL.Opt(IDL.Nat32)
    });
    const satoshi = IDL.Nat64;
    const bitcoin_get_balance_result = satoshi;
    const bitcoin_block_height = IDL.Nat32;
    const bitcoin_get_block_headers_args = IDL.Record({
        start_height: bitcoin_block_height,
        end_height: IDL.Opt(bitcoin_block_height),
        network: bitcoin_network
    });
    const bitcoin_block_header = IDL.Vec(IDL.Nat8);
    const bitcoin_get_block_headers_result = IDL.Record({
        tip_height: bitcoin_block_height,
        block_headers: IDL.Vec(bitcoin_block_header)
    });
    const bitcoin_get_current_fee_percentiles_args = IDL.Record({
        network: bitcoin_network
    });
    const millisatoshi_per_byte = IDL.Nat64;
    const bitcoin_get_current_fee_percentiles_result = IDL.Vec(
        millisatoshi_per_byte
    );
    const bitcoin_get_utxos_args = IDL.Record({
        network: bitcoin_network,
        filter: IDL.Opt(
            IDL.Variant({
                page: IDL.Vec(IDL.Nat8),
                min_confirmations: IDL.Nat32
            })
        ),
        address: bitcoin_address
    });
    const bitcoin_block_hash = IDL.Vec(IDL.Nat8);
    const outpoint = IDL.Record({
        txid: IDL.Vec(IDL.Nat8),
        vout: IDL.Nat32
    });
    const utxo = IDL.Record({
        height: IDL.Nat32,
        value: satoshi,
        outpoint: outpoint
    });
    const bitcoin_get_utxos_result = IDL.Record({
        next_page: IDL.Opt(IDL.Vec(IDL.Nat8)),
        tip_height: bitcoin_block_height,
        tip_block_hash: bitcoin_block_hash,
        utxos: IDL.Vec(utxo)
    });
    const bitcoin_send_transaction_args = IDL.Record({
        transaction: IDL.Vec(IDL.Nat8),
        network: bitcoin_network
    });
    const canister_id = IDL.Principal;
    const canister_info_args = IDL.Record({
        canister_id: canister_id,
        num_requested_changes: IDL.Opt(IDL.Nat64)
    });
    const change_origin = IDL.Variant({
        from_user: IDL.Record({ user_id: IDL.Principal }),
        from_canister: IDL.Record({
            canister_version: IDL.Opt(IDL.Nat64),
            canister_id: IDL.Principal
        })
    });
    const snapshot_id = IDL.Vec(IDL.Nat8);
    const change_details = IDL.Variant({
        creation: IDL.Record({ controllers: IDL.Vec(IDL.Principal) }),
        code_deployment: IDL.Record({
            mode: IDL.Variant({
                reinstall: IDL.Null,
                upgrade: IDL.Null,
                install: IDL.Null
            }),
            module_hash: IDL.Vec(IDL.Nat8)
        }),
        load_snapshot: IDL.Record({
            canister_version: IDL.Nat64,
            taken_at_timestamp: IDL.Nat64,
            snapshot_id: snapshot_id
        }),
        controllers_change: IDL.Record({
            controllers: IDL.Vec(IDL.Principal)
        }),
        code_uninstall: IDL.Null
    });
    const change = IDL.Record({
        timestamp_nanos: IDL.Nat64,
        canister_version: IDL.Nat64,
        origin: change_origin,
        details: change_details
    });
    const canister_info_result = IDL.Record({
        controllers: IDL.Vec(IDL.Principal),
        module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
        recent_changes: IDL.Vec(change),
        total_num_changes: IDL.Nat64
    });
    const canister_status_args = IDL.Record({ canister_id: canister_id });
    const log_visibility = IDL.Variant({
        controllers: IDL.Null,
        public: IDL.Null,
        allowed_viewers: IDL.Vec(IDL.Principal)
    });
    const definite_canister_settings = IDL.Record({
        freezing_threshold: IDL.Nat,
        controllers: IDL.Vec(IDL.Principal),
        reserved_cycles_limit: IDL.Nat,
        log_visibility: log_visibility,
        wasm_memory_limit: IDL.Nat,
        memory_allocation: IDL.Nat,
        compute_allocation: IDL.Nat
    });
    const canister_status_result = IDL.Record({
        status: IDL.Variant({
            stopped: IDL.Null,
            stopping: IDL.Null,
            running: IDL.Null
        }),
        memory_size: IDL.Nat,
        cycles: IDL.Nat,
        settings: definite_canister_settings,
        query_stats: IDL.Record({
            response_payload_bytes_total: IDL.Nat,
            num_instructions_total: IDL.Nat,
            num_calls_total: IDL.Nat,
            request_payload_bytes_total: IDL.Nat
        }),
        idle_cycles_burned_per_day: IDL.Nat,
        module_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
        reserved_cycles: IDL.Nat
    });
    const clear_chunk_store_args = IDL.Record({ canister_id: canister_id });
    const canister_settings = IDL.Record({
        freezing_threshold: IDL.Opt(IDL.Nat),
        controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
        reserved_cycles_limit: IDL.Opt(IDL.Nat),
        log_visibility: IDL.Opt(log_visibility),
        wasm_memory_limit: IDL.Opt(IDL.Nat),
        memory_allocation: IDL.Opt(IDL.Nat),
        compute_allocation: IDL.Opt(IDL.Nat)
    });
    const create_canister_args = IDL.Record({
        settings: IDL.Opt(canister_settings),
        sender_canister_version: IDL.Opt(IDL.Nat64)
    });
    const create_canister_result = IDL.Record({ canister_id: canister_id });
    const delete_canister_args = IDL.Record({ canister_id: canister_id });
    const delete_canister_snapshot_args = IDL.Record({
        canister_id: canister_id,
        snapshot_id: snapshot_id
    });
    const deposit_cycles_args = IDL.Record({ canister_id: canister_id });
    const ecdsa_curve = IDL.Variant({ secp256k1: IDL.Null });
    const ecdsa_public_key_args = IDL.Record({
        key_id: IDL.Record({ name: IDL.Text, curve: ecdsa_curve }),
        canister_id: IDL.Opt(canister_id),
        derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8))
    });
    const ecdsa_public_key_result = IDL.Record({
        public_key: IDL.Vec(IDL.Nat8),
        chain_code: IDL.Vec(IDL.Nat8)
    });
    const fetch_canister_logs_args = IDL.Record({ canister_id: canister_id });
    const canister_log_record = IDL.Record({
        idx: IDL.Nat64,
        timestamp_nanos: IDL.Nat64,
        content: IDL.Vec(IDL.Nat8)
    });
    const fetch_canister_logs_result = IDL.Record({
        canister_log_records: IDL.Vec(canister_log_record)
    });
    const http_header = IDL.Record({ value: IDL.Text, name: IDL.Text });
    const http_request_result = IDL.Record({
        status: IDL.Nat,
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(http_header)
    });
    const http_transform_args = IDL.Record({
        context: IDL.Vec(IDL.Nat8),
        response: http_request_result
    });
    const http_transform = IDL.Record({
        function: IDL.Func(
            [http_transform_args],
            [http_request_result],
            ['query']
        ),
        context: IDL.Vec(IDL.Nat8)
    });
    const http_request_args = IDL.Record({
        url: IDL.Text,
        method: IDL.Variant({
            get: IDL.Null,
            head: IDL.Null,
            post: IDL.Null
        }),
        max_response_bytes: IDL.Opt(IDL.Nat64),
        body: IDL.Opt(IDL.Vec(IDL.Nat8)),
        transform: IDL.Opt(http_transform),
        headers: IDL.Vec(http_header)
    });
    const canister_install_mode = IDL.Variant({
        reinstall: IDL.Null,
        upgrade: IDL.Opt(
            IDL.Record({
                wasm_memory_persistence: IDL.Opt(
                    IDL.Variant({ keep: IDL.Null, replace: IDL.Null })
                ),
                skip_pre_upgrade: IDL.Opt(IDL.Bool)
            })
        ),
        install: IDL.Null
    });
    const chunk_hash = IDL.Record({ hash: IDL.Vec(IDL.Nat8) });
    const install_chunked_code_args = IDL.Record({
        arg: IDL.Vec(IDL.Nat8),
        wasm_module_hash: IDL.Vec(IDL.Nat8),
        mode: canister_install_mode,
        chunk_hashes_list: IDL.Vec(chunk_hash),
        target_canister: canister_id,
        store_canister: IDL.Opt(canister_id),
        sender_canister_version: IDL.Opt(IDL.Nat64)
    });
    const wasm_module = IDL.Vec(IDL.Nat8);
    const install_code_args = IDL.Record({
        arg: IDL.Vec(IDL.Nat8),
        wasm_module: wasm_module,
        mode: canister_install_mode,
        canister_id: canister_id,
        sender_canister_version: IDL.Opt(IDL.Nat64)
    });
    const list_canister_snapshots_args = IDL.Record({
        canister_id: canister_id
    });
    const snapshot = IDL.Record({
        id: snapshot_id,
        total_size: IDL.Nat64,
        taken_at_timestamp: IDL.Nat64
    });
    const list_canister_snapshots_result = IDL.Vec(snapshot);
    const load_canister_snapshot_args = IDL.Record({
        canister_id: canister_id,
        sender_canister_version: IDL.Opt(IDL.Nat64),
        snapshot_id: snapshot_id
    });
    const node_metrics_history_args = IDL.Record({
        start_at_timestamp_nanos: IDL.Nat64,
        subnet_id: IDL.Principal
    });
    const node_metrics = IDL.Record({
        num_block_failures_total: IDL.Nat64,
        node_id: IDL.Principal,
        num_blocks_proposed_total: IDL.Nat64
    });
    const node_metrics_history_result = IDL.Vec(
        IDL.Record({
            timestamp_nanos: IDL.Nat64,
            node_metrics: IDL.Vec(node_metrics)
        })
    );
    const provisional_create_canister_with_cycles_args = IDL.Record({
        settings: IDL.Opt(canister_settings),
        specified_id: IDL.Opt(canister_id),
        amount: IDL.Opt(IDL.Nat),
        sender_canister_version: IDL.Opt(IDL.Nat64)
    });
    const provisional_create_canister_with_cycles_result = IDL.Record({
        canister_id: canister_id
    });
    const provisional_top_up_canister_args = IDL.Record({
        canister_id: canister_id,
        amount: IDL.Nat
    });
    const raw_rand_result = IDL.Vec(IDL.Nat8);
    const schnorr_algorithm = IDL.Variant({
        ed25519: IDL.Null,
        bip340secp256k1: IDL.Null
    });
    const schnorr_public_key_args = IDL.Record({
        key_id: IDL.Record({
            algorithm: schnorr_algorithm,
            name: IDL.Text
        }),
        canister_id: IDL.Opt(canister_id),
        derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8))
    });
    const schnorr_public_key_result = IDL.Record({
        public_key: IDL.Vec(IDL.Nat8),
        chain_code: IDL.Vec(IDL.Nat8)
    });
    const sign_with_ecdsa_args = IDL.Record({
        key_id: IDL.Record({ name: IDL.Text, curve: ecdsa_curve }),
        derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)),
        message_hash: IDL.Vec(IDL.Nat8)
    });
    const sign_with_ecdsa_result = IDL.Record({
        signature: IDL.Vec(IDL.Nat8)
    });
    const sign_with_schnorr_args = IDL.Record({
        key_id: IDL.Record({
            algorithm: schnorr_algorithm,
            name: IDL.Text
        }),
        derivation_path: IDL.Vec(IDL.Vec(IDL.Nat8)),
        message: IDL.Vec(IDL.Nat8)
    });
    const sign_with_schnorr_result = IDL.Record({
        signature: IDL.Vec(IDL.Nat8)
    });
    const start_canister_args = IDL.Record({ canister_id: canister_id });
    const stop_canister_args = IDL.Record({ canister_id: canister_id });
    const stored_chunks_args = IDL.Record({ canister_id: canister_id });
    const stored_chunks_result = IDL.Vec(chunk_hash);
    const subnet_info_args = IDL.Record({ subnet_id: IDL.Principal });
    const subnet_info_result = IDL.Record({ replica_version: IDL.Text });
    const take_canister_snapshot_args = IDL.Record({
        replace_snapshot: IDL.Opt(snapshot_id),
        canister_id: canister_id
    });
    const take_canister_snapshot_result = snapshot;
    const uninstall_code_args = IDL.Record({
        canister_id: canister_id,
        sender_canister_version: IDL.Opt(IDL.Nat64)
    });
    const update_settings_args = IDL.Record({
        canister_id: IDL.Principal,
        settings: canister_settings,
        sender_canister_version: IDL.Opt(IDL.Nat64)
    });
    const upload_chunk_args = IDL.Record({
        chunk: IDL.Vec(IDL.Nat8),
        canister_id: IDL.Principal
    });
    const upload_chunk_result = chunk_hash;
    return IDL.Service({
        bitcoin_get_balance: IDL.Func(
            [bitcoin_get_balance_args],
            [bitcoin_get_balance_result],
            []
        ),
        bitcoin_get_block_headers: IDL.Func(
            [bitcoin_get_block_headers_args],
            [bitcoin_get_block_headers_result],
            []
        ),
        bitcoin_get_current_fee_percentiles: IDL.Func(
            [bitcoin_get_current_fee_percentiles_args],
            [bitcoin_get_current_fee_percentiles_result],
            []
        ),
        bitcoin_get_utxos: IDL.Func(
            [bitcoin_get_utxos_args],
            [bitcoin_get_utxos_result],
            []
        ),
        bitcoin_send_transaction: IDL.Func(
            [bitcoin_send_transaction_args],
            [],
            []
        ),
        canister_info: IDL.Func(
            [canister_info_args],
            [canister_info_result],
            []
        ),
        canister_status: IDL.Func(
            [canister_status_args],
            [canister_status_result],
            []
        ),
        clear_chunk_store: IDL.Func([clear_chunk_store_args], [], []),
        create_canister: IDL.Func(
            [create_canister_args],
            [create_canister_result],
            []
        ),
        delete_canister: IDL.Func([delete_canister_args], [], []),
        delete_canister_snapshot: IDL.Func(
            [delete_canister_snapshot_args],
            [],
            []
        ),
        deposit_cycles: IDL.Func([deposit_cycles_args], [], []),
        ecdsa_public_key: IDL.Func(
            [ecdsa_public_key_args],
            [ecdsa_public_key_result],
            []
        ),
        fetch_canister_logs: IDL.Func(
            [fetch_canister_logs_args],
            [fetch_canister_logs_result],
            ['query']
        ),
        http_request: IDL.Func([http_request_args], [http_request_result], []),
        install_chunked_code: IDL.Func([install_chunked_code_args], [], []),
        install_code: IDL.Func([install_code_args], [], []),
        list_canister_snapshots: IDL.Func(
            [list_canister_snapshots_args],
            [list_canister_snapshots_result],
            []
        ),
        load_canister_snapshot: IDL.Func([load_canister_snapshot_args], [], []),
        node_metrics_history: IDL.Func(
            [node_metrics_history_args],
            [node_metrics_history_result],
            []
        ),
        provisional_create_canister_with_cycles: IDL.Func(
            [provisional_create_canister_with_cycles_args],
            [provisional_create_canister_with_cycles_result],
            []
        ),
        provisional_top_up_canister: IDL.Func(
            [provisional_top_up_canister_args],
            [],
            []
        ),
        raw_rand: IDL.Func([], [raw_rand_result], []),
        schnorr_public_key: IDL.Func(
            [schnorr_public_key_args],
            [schnorr_public_key_result],
            []
        ),
        sign_with_ecdsa: IDL.Func(
            [sign_with_ecdsa_args],
            [sign_with_ecdsa_result],
            []
        ),
        sign_with_schnorr: IDL.Func(
            [sign_with_schnorr_args],
            [sign_with_schnorr_result],
            []
        ),
        start_canister: IDL.Func([start_canister_args], [], []),
        stop_canister: IDL.Func([stop_canister_args], [], []),
        stored_chunks: IDL.Func(
            [stored_chunks_args],
            [stored_chunks_result],
            []
        ),
        subnet_info: IDL.Func([subnet_info_args], [subnet_info_result], []),
        take_canister_snapshot: IDL.Func(
            [take_canister_snapshot_args],
            [take_canister_snapshot_result],
            []
        ),
        uninstall_code: IDL.Func([uninstall_code_args], [], []),
        update_settings: IDL.Func([update_settings_args], [], []),
        upload_chunk: IDL.Func([upload_chunk_args], [upload_chunk_result], [])
    });
};
export const init: init = () => {
    return [];
};
