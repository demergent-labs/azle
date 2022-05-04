export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'get' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query']),
    'set' : IDL.Func([IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
