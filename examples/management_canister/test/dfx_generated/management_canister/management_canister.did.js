export const idlFactory = ({ IDL }) => {
  const CreateCanisterResult = IDL.Record({ 'canister_id' : IDL.Principal });
  const ExecuteCreateCanisterResult = IDL.Variant({
    'ok' : CreateCanisterResult,
    'err' : IDL.Text,
  });
  const DefaultResult = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  const CanisterStatusArgs = IDL.Record({ 'canister_id' : IDL.Principal });
  const CanisterStatus = IDL.Variant({
    'stopped' : IDL.Null,
    'stopping' : IDL.Null,
    'running' : IDL.Null,
  });
  const DefiniteCanisterSettings = IDL.Record({
    'freezing_threshold' : IDL.Nat,
    'controllers' : IDL.Vec(IDL.Principal),
    'memory_allocation' : IDL.Nat,
    'compute_allocation' : IDL.Nat,
  });
  const CanisterStatusResult = IDL.Record({
    'status' : CanisterStatus,
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : DefiniteCanisterSettings,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const GetCanisterStatusResult = IDL.Variant({
    'ok' : CanisterStatusResult,
    'err' : IDL.Text,
  });
  const RawRandResult = IDL.Variant({
    'ok' : IDL.Vec(IDL.Nat8),
    'err' : IDL.Text,
  });
  const ExecuteProvisionalCreateCanisterWithCyclesResult = IDL.Variant({
    'ok' : CreateCanisterResult,
    'err' : IDL.Text,
  });
  return IDL.Service({
    'execute_create_canister' : IDL.Func([], [ExecuteCreateCanisterResult], []),
    'execute_delete_canister' : IDL.Func([IDL.Principal], [DefaultResult], []),
    'execute_start_canister' : IDL.Func([IDL.Principal], [DefaultResult], []),
    'execute_stop_canister' : IDL.Func([IDL.Principal], [DefaultResult], []),
    'execute_uninstall_code' : IDL.Func([IDL.Principal], [DefaultResult], []),
    'execute_update_settings' : IDL.Func([IDL.Principal], [DefaultResult], []),
    'get_canister_status' : IDL.Func(
        [CanisterStatusArgs],
        [GetCanisterStatusResult],
        [],
      ),
    'get_created_canister_id' : IDL.Func([], [IDL.Principal], ['query']),
    'get_raw_rand' : IDL.Func([], [RawRandResult], []),
    'provisional_create_canister_with_cycles' : IDL.Func(
        [],
        [ExecuteProvisionalCreateCanisterWithCyclesResult],
        [],
      ),
    'provisional_top_up_canister' : IDL.Func(
        [IDL.Principal, IDL.Nat],
        [DefaultResult],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
