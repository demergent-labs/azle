export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getInitialized' : IDL.Func([], [IDL.Bool], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
