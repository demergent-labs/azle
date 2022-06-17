export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'getInitialized' : IDL.Func([], [IDL.Bool], []) });
};
export const init = ({ IDL }) => { return []; };
