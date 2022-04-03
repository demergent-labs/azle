export const idlFactory = ({ IDL }) => {
  const Superhero = IDL.Record({
    'superpowers' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
  });
  return IDL.Service({
    'create' : IDL.Func([Superhero], [IDL.Int32], []),
    'deleteHero' : IDL.Func([IDL.Int32], [IDL.Bool], []),
    'read' : IDL.Func([IDL.Int32], [IDL.Opt(Superhero)], ['query']),
    'update' : IDL.Func([IDL.Int32, Superhero], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
