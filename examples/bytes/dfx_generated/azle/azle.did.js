export const idlFactory = ({ IDL }) => {
    const PerformanceStats = IDL.Record({ get_bytes: IDL.Vec(IDL.Nat64) });
    return IDL.Service({
        get_bytes: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [IDL.Vec(IDL.Nat8)],
            ['query']
        ),
        get_performance_states: IDL.Func([], [PerformanceStats], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
