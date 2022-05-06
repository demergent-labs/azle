export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'query' : IDL.Func([], [IDL.Text], ['query']),
    'update' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
