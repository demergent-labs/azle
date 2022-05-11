export const idlFactory = ({ IDL }) => {
  const Tokens = IDL.Record({ 'e8s' : IDL.Nat64 });
  const TransferError = IDL.Variant({
    'TxTooOld' : IDL.Record({ 'allowed_window_nanos' : IDL.Nat64 }),
    'BadFee' : IDL.Record({ 'expected_fee' : Tokens }),
    'TxDuplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat64 }),
    'TxCreatedInFuture' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : Tokens }),
  });
  const TransferResult = IDL.Variant({
    'Ok' : IDL.Nat64,
    'Err' : TransferError,
  });
  const ExecuteTransferResult = IDL.Variant({
    'ok' : TransferResult,
    'err' : IDL.Text,
  });
  const GetAccountBalanceResult = IDL.Variant({
    'ok' : Tokens,
    'err' : IDL.Text,
  });
  const Archive = IDL.Record({ 'canister_id' : IDL.Principal });
  const Archives = IDL.Record({ 'archives' : IDL.Vec(Archive) });
  const GetArchivesResult = IDL.Variant({ 'ok' : Archives, 'err' : IDL.Text });
  const GetBlocksArgs = IDL.Record({
    'start' : IDL.Nat64,
    'length' : IDL.Nat64,
  });
  const Operation = IDL.Variant({
    'Burn' : IDL.Record({ 'from' : IDL.Vec(IDL.Nat8), 'amount' : Tokens }),
    'Mint' : IDL.Record({ 'to' : IDL.Vec(IDL.Nat8), 'amount' : Tokens }),
    'Transfer' : IDL.Record({
      'to' : IDL.Vec(IDL.Nat8),
      'fee' : Tokens,
      'from' : IDL.Vec(IDL.Nat8),
      'amount' : Tokens,
    }),
  });
  const TimeStamp = IDL.Record({ 'timestamp_nanos' : IDL.Nat64 });
  const Transaction = IDL.Record({
    'memo' : IDL.Nat64,
    'operation' : IDL.Opt(Operation),
    'created_at_time' : TimeStamp,
  });
  const Block = IDL.Record({
    'transaction' : Transaction,
    'timestamp' : TimeStamp,
    'parent_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const QueryBlocksResponse = IDL.Record({
    'certificate' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'blocks' : IDL.Vec(Block),
    'chain_length' : IDL.Nat64,
    'first_block_index' : IDL.Nat64,
    'archived_blocks' : IDL.Vec(
      IDL.Record({ 'start' : IDL.Nat64, 'length' : IDL.Nat64 })
    ),
  });
  const GetBlocksResult = IDL.Variant({
    'ok' : QueryBlocksResponse,
    'err' : IDL.Text,
  });
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
    'get_blocks' : IDL.Func([GetBlocksArgs], [GetBlocksResult], []),
    'get_decimals' : IDL.Func([], [GetDecimalsResult], []),
    'get_name' : IDL.Func([], [GetNameResult], []),
    'get_symbol' : IDL.Func([], [GetSymbolResult], []),
    'get_transfer_fee' : IDL.Func([], [GetTransferFeeResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
