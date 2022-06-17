export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'acceptMessage' : IDL.Func([], [IDL.Bool], []) });
};
export const init = ({ IDL }) => { return []; };
