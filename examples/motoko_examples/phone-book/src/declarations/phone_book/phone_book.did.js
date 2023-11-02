export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        insert: IDL.Func(
            [IDL.Text, IDL.Record({ desc: IDL.Text, phone: IDL.Text })],
            [],
            []
        ),
        lookup: IDL.Func(
            [IDL.Text],
            [IDL.Opt(IDL.Record({ desc: IDL.Text, phone: IDL.Text }))],
            ['query']
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
