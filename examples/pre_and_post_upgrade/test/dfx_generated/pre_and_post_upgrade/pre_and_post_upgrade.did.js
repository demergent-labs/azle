export const idlFactory = ({ IDL }) => {
  const Entry = IDL.Record({ 'key' : IDL.Text, 'value' : IDL.Nat64 });
  return IDL.Service({
    'getEntries' : IDL.Func([], [IDL.Vec(Entry)], ['query']),
    'setEntry' : IDL.Func([Entry], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
