export const idlFactory = ({ IDL }) => {
    const Element = IDL.Record({ id: IDL.Text });
    const Head = IDL.Record({ elements: IDL.Vec(Element) });
    const Html = IDL.Record({ head: IDL.Opt(Head) });
    return IDL.Service({
        get_element: IDL.Func(
            [IDL.Opt(IDL.Opt(Element))],
            [IDL.Opt(IDL.Opt(Element))],
            ['query']
        ),
        get_head: IDL.Func([], [IDL.Opt(Head)], ['query']),
        get_head_with_elements: IDL.Func([], [IDL.Opt(Head)], ['query']),
        get_html: IDL.Func([], [Html], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
