export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'sort' : IDL.Func([IDL.Vec(IDL.Int)], [IDL.Vec(IDL.Int)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
