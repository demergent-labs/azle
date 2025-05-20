export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'cryptoGetRandomValues' : IDL.Func(
        [IDL.Text, IDL.Nat32],
        [IDL.Vec(IDL.Nat8)],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
