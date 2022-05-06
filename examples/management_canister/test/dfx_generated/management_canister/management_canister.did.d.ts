import type { Principal } from '@dfinity/principal';
export interface CanisterSettings {
  'freezing_threshold' : [] | [bigint],
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : [] | [bigint],
  'compute_allocation' : [] | [bigint],
}
export type CanisterStatus = { 'stopped' : null } |
  { 'stopping' : null } |
  { 'running' : null };
export interface CanisterStatusArgs { 'canister_id' : Principal }
export interface CanisterStatusResult {
  'status' : CanisterStatus,
  'memory_size' : bigint,
  'cycles' : bigint,
  'settings' : DefiniteCanisterSettings,
  'module_hash' : [] | [Array<number>],
}
export interface CreateCanisterArgs { 'settings' : [] | [CanisterSettings] }
export interface CreateCanisterResult { 'canister_id' : Principal }
export type DefaultResult = { 'ok' : boolean } |
  { 'err' : string };
export interface DefiniteCanisterSettings {
  'freezing_threshold' : bigint,
  'controllers' : Array<Principal>,
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface DeleteCanisterArgs { 'canister_id' : Principal }
export interface DepositCyclesArgs { 'canister_id' : Principal }
export type ExecuteCreateCanisterResult = { 'ok' : CreateCanisterResult } |
  { 'err' : string };
export type ExecuteProvisionalCreateCanisterWithCyclesResult = {
    'ok' : CreateCanisterResult
  } |
  { 'err' : string };
export type GetCanisterStatusResult = { 'ok' : CanisterStatusResult } |
  { 'err' : string };
export interface InstallCodeArgs {
  'arg' : Array<number>,
  'wasm_module' : Array<number>,
  'mode' : InstallCodeMode,
  'canister_id' : Principal,
}
export type InstallCodeMode = { 'reinstall' : null } |
  { 'upgrade' : null } |
  { 'install' : null };
export interface ProvisionalCreateCanisterWithCyclesArgs {
  'settings' : [] | [CanisterSettings],
  'amount' : [] | [bigint],
}
export interface ProvisionalCreateCanisterWithCyclesResult {
  'canister_id' : Principal,
}
export interface ProvisionalTopUpCanisterArgs {
  'canister_id' : Principal,
  'amount' : bigint,
}
export type RawRandResult = { 'ok' : Array<number> } |
  { 'err' : string };
export interface StartCanisterArgs { 'canister_id' : Principal }
export interface StopCanisterArgs { 'canister_id' : Principal }
export interface UninstallCodeArgs { 'canister_id' : Principal }
export interface UpdateSettingsArgs {
  'canister_id' : Principal,
  'settings' : CanisterSettings,
}
export interface _SERVICE {
  'execute_create_canister' : () => Promise<ExecuteCreateCanisterResult>,
  'execute_delete_canister' : (arg_0: Principal) => Promise<DefaultResult>,
  'execute_start_canister' : (arg_0: Principal) => Promise<DefaultResult>,
  'execute_stop_canister' : (arg_0: Principal) => Promise<DefaultResult>,
  'execute_uninstall_code' : (arg_0: Principal) => Promise<DefaultResult>,
  'execute_update_settings' : (arg_0: Principal) => Promise<DefaultResult>,
  'get_canister_status' : (arg_0: CanisterStatusArgs) => Promise<
      GetCanisterStatusResult
    >,
  'get_created_canister_id' : () => Promise<Principal>,
  'get_raw_rand' : () => Promise<RawRandResult>,
  'provisional_create_canister_with_cycles' : () => Promise<
      ExecuteProvisionalCreateCanisterWithCyclesResult
    >,
  'provisional_top_up_canister' : (arg_0: Principal, arg_1: bigint) => Promise<
      DefaultResult
    >,
}
