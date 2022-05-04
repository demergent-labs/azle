export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({ 'id' : IDL.Text });
  const Reaction = IDL.Variant({ 'Fire' : IDL.Null, 'Wave' : IDL.Null });
  return IDL.Service({
    'getOwner' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'getReaction' : IDL.Func([], [IDL.Opt(Reaction)], ['query']),
    'getUser' : IDL.Func([], [IDL.Opt(User)], ['query']),
  });
};
export const init = ({ IDL }) => {
  const User = IDL.Record({ 'id' : IDL.Text });
  const Reaction = IDL.Variant({ 'Fire' : IDL.Null, 'Wave' : IDL.Null });
  return [User, Reaction, IDL.Principal];
};
