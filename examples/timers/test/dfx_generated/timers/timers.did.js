export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        clear_timer: IDL.Func([IDL.Nat64], [], ['query']),
        one_time_timer: IDL.Func([], [], []),
        repeated_timer: IDL.Func([], [], ['query']),
        repeated_timer_call_count: IDL.Func([], [IDL.Nat32], ['query']),
        single_use_timer_called: IDL.Func([], [IDL.Bool], ['query']),
        start_timers: IDL.Func(
            [IDL.Nat64, IDL.Nat64],
            [IDL.Tuple(IDL.Nat64, IDL.Nat64)],
            []
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
