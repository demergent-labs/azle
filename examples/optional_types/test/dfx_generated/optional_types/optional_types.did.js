export const idlFactory = ({ IDL }) => {
  const Element = IDL.Record({ 'id' : IDL.Text });
  const Head = IDL.Record({ 'elements' : IDL.Vec(Element) });
  const HTML = IDL.Record({ 'head' : IDL.Opt(Head) });
  return IDL.Service({
    'getElement' : IDL.Func(
        [IDL.Opt(IDL.Opt(Element))],
        [IDL.Opt(IDL.Opt(Element))],
        ['query'],
      ),
    'getHTML' : IDL.Func([], [HTML], ['query']),
    'getHead' : IDL.Func([], [IDL.Opt(Head)], ['query']),
    'getHeadWithElements' : IDL.Func([], [IDL.Opt(Head)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
