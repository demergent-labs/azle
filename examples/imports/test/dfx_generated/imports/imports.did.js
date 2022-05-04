export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getOne' : IDL.Func([], [IDL.Text], ['query']),
    'getThree' : IDL.Func([], [IDL.Text], ['query']),
    'getTwo' : IDL.Func([], [IDL.Text], ['query']),
    'sha224Hash' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
