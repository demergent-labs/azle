export const idlFactory = ({ IDL }) => {
  const ExecuteTransferResult = IDL.Variant({
    'ok' : IDL.Bool,
    'err' : IDL.Text,
  });
  const Tokens = IDL.Record({ 'e8s' : IDL.Nat64 });
  const GetAccountBalanceResult = IDL.Variant({
    'ok' : Tokens,
    'err' : IDL.Text,
  });
  const Archive = IDL.Record({ 'canister_id' : IDL.Principal });
  const Archives = IDL.Record({ 'archives' : IDL.Vec(Archive) });
  const GetArchivesResult = IDL.Variant({ 'ok' : Archives, 'err' : IDL.Text });
  const GetDecimalsResult = IDL.Variant({ 'ok' : IDL.Nat32, 'err' : IDL.Text });
  const GetNameResult = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const GetSymbolResult = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const TransferFee = IDL.Record({ 'transfer_fee' : Tokens });
  const GetTransferFeeResult = IDL.Variant({
    'ok' : TransferFee,
    'err' : IDL.Text,
  });
  return IDL.Service({
    'execute_transfer' : IDL.Func(
        [IDL.Text, IDL.Nat64, IDL.Nat64, IDL.Opt(IDL.Nat64)],
        [ExecuteTransferResult],
        [],
      ),
    'get_account_balance' : IDL.Func([IDL.Text], [GetAccountBalanceResult], []),
    'get_archives' : IDL.Func([], [GetArchivesResult], []),
    'get_decimals' : IDL.Func([], [GetDecimalsResult], []),
    'get_name' : IDL.Func([], [GetNameResult], []),
    'get_symbol' : IDL.Func([], [GetSymbolResult], []),
    'get_transfer_fee' : IDL.Func([], [GetTransferFeeResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
