export const idlFactory = ({ IDL }) => {
    const ManualReply = IDL.Variant({ ok: IDL.Text, err: IDL.Text });
    const ManualReply_1 = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
    return IDL.Service({
        deep_query: IDL.Func([], [ManualReply], ['query']),
        inc_canister1: IDL.Func([], [ManualReply_1], ['query']),
        inc_canister2: IDL.Func([], [ManualReply_1], ['query']),
        inc_counter: IDL.Func([], [IDL.Nat], ['query']),
        manual_query: IDL.Func([], [ManualReply], ['query']),
        simple_composite_query: IDL.Func([], [ManualReply], ['query']),
        simple_query: IDL.Func([], [ManualReply], ['query']),
        simple_update: IDL.Func([], [ManualReply], []),
        totally_manual_query: IDL.Func([], [ManualReply], ['query']),
        update_query: IDL.Func([], [ManualReply], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
