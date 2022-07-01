export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'manual_query' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'manual_update' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
