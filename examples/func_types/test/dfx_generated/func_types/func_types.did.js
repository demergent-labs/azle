export const idlFactory = ({ IDL }) => {
    const ComplexFunc = IDL.Rec();
    const BasicFunc = IDL.Func([IDL.Text], [IDL.Text], ['query']);
    const User = IDL.Record({
        id: IDL.Text,
        basic_func: BasicFunc,
        complex_func: ComplexFunc
    });
    const Reaction = IDL.Variant({
        Bad: IDL.Null,
        ComplexFunc: ComplexFunc,
        Good: IDL.Null,
        BasicFunc: BasicFunc
    });
    ComplexFunc.fill(IDL.Func([User, Reaction], [IDL.Nat64], []));
    const NotifierFunc = IDL.Func([IDL.Vec(IDL.Nat8)], [], ['query']);
    const GetNotifierFromNotifiersCanisterResult = IDL.Variant({
        ok: NotifierFunc,
        err: IDL.Text
    });
    const StableFunc = IDL.Func([IDL.Nat64, IDL.Text], [], ['query']);
    return IDL.Service({
        basic_func_param: IDL.Func([BasicFunc], [BasicFunc], ['query']),
        basic_func_param_array: IDL.Func(
            [IDL.Vec(BasicFunc)],
            [IDL.Vec(BasicFunc)],
            ['query']
        ),
        basic_func_return_type: IDL.Func([], [BasicFunc], ['query']),
        basic_func_return_type_array: IDL.Func(
            [],
            [IDL.Vec(BasicFunc)],
            ['query']
        ),
        complex_func_param: IDL.Func([ComplexFunc], [ComplexFunc], ['query']),
        complex_func_return_type: IDL.Func([], [ComplexFunc], ['query']),
        get_notifier_from_notifiers_canister: IDL.Func(
            [],
            [GetNotifierFromNotifiersCanisterResult],
            []
        ),
        get_stable_func: IDL.Func([], [StableFunc], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
