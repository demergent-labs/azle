export const idlFactory = ({ IDL }) => {
    const HttpHeader = IDL.Record({ value: IDL.Text, name: IDL.Text });
    const HttpResponse = IDL.Record({
        status: IDL.Nat64,
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(HttpHeader)
    });
    return IDL.Service({
        eth_block_number_transform: IDL.Func(
            [HttpResponse],
            [HttpResponse],
            ['query']
        ),
        eth_get_balance: IDL.Func([IDL.Text], [IDL.Text], []),
        eth_get_block_by_number: IDL.Func([IDL.Nat32], [IDL.Text], [])
    });
};
export const init = ({ IDL }) => {
    return [IDL.Text];
};
