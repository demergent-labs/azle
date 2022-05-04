export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'query' : IDL.Func([], [IDL.Text], ['query']) });
};
export const init = ({ IDL }) => { return []; };
