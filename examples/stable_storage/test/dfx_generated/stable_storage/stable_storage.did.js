export const idlFactory = ({ IDL }) => {
  const Emotion = IDL.Variant({ 'Sad' : IDL.Null, 'Happy' : IDL.Null });
  const Fireworks = IDL.Record({ 'id' : IDL.Text, 'name' : IDL.Text });
  const Reaction = IDL.Variant({
    'Emotion' : Emotion,
    'Great' : IDL.Null,
    'Fire' : IDL.Null,
    'Fireworks' : Fireworks,
  });
  const Country = IDL.Variant({
    'UK' : IDL.Null,
    'USA' : IDL.Null,
    'CANADA' : IDL.Null,
  });
  const Child = IDL.Record({ 'id' : IDL.Text });
  const User = IDL.Record({
    'id' : IDL.Text,
    'country' : Country,
    'children' : IDL.Vec(Child),
  });
  return IDL.Service({
    'readStableFloat32' : IDL.Func([], [IDL.Float32], ['query']),
    'readStableFloat64' : IDL.Func([], [IDL.Float64], ['query']),
    'readStableInt' : IDL.Func([], [IDL.Int], ['query']),
    'readStableInt16' : IDL.Func([], [IDL.Int16], ['query']),
    'readStableInt32' : IDL.Func([], [IDL.Int32], ['query']),
    'readStableInt64' : IDL.Func([], [IDL.Int64], ['query']),
    'readStableInt8' : IDL.Func([], [IDL.Int8], ['query']),
    'readStableNat' : IDL.Func([], [IDL.Nat], ['query']),
    'readStableNat16' : IDL.Func([], [IDL.Nat16], ['query']),
    'readStableNat32' : IDL.Func([], [IDL.Nat32], ['query']),
    'readStableNat64' : IDL.Func([], [IDL.Nat64], ['query']),
    'readStableNat8' : IDL.Func([], [IDL.Nat8], ['query']),
    'readStablePrincipal' : IDL.Func([], [IDL.Principal], ['query']),
    'readStableReaction' : IDL.Func([], [Reaction], ['query']),
    'readStableString' : IDL.Func([], [IDL.Text], ['query']),
    'readStableUser' : IDL.Func([], [User], ['query']),
    'writeStableFloat32' : IDL.Func([IDL.Float32], [], []),
    'writeStableFloat64' : IDL.Func([IDL.Float64], [], []),
    'writeStableInt' : IDL.Func([IDL.Int], [], []),
    'writeStableInt16' : IDL.Func([IDL.Int16], [], []),
    'writeStableInt32' : IDL.Func([IDL.Int32], [], []),
    'writeStableInt64' : IDL.Func([IDL.Int64], [], []),
    'writeStableInt8' : IDL.Func([IDL.Int8], [], []),
    'writeStableNat' : IDL.Func([IDL.Nat], [], []),
    'writeStableNat16' : IDL.Func([IDL.Nat16], [], []),
    'writeStableNat32' : IDL.Func([IDL.Nat32], [], []),
    'writeStableNat64' : IDL.Func([IDL.Nat64], [], []),
    'writeStableNat8' : IDL.Func([IDL.Nat8], [], []),
    'writeStablePrincipal' : IDL.Func([IDL.Principal], [], []),
    'writeStableReaction' : IDL.Func([Reaction], [], []),
    'writeStableString' : IDL.Func([IDL.Text], [], []),
    'writeStableUser' : IDL.Func([User], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
