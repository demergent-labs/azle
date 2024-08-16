export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        getTimerEnded: IDL.Func([], [IDL.Bool], ['query']),
        getTimerInstructions: IDL.Func([], [IDL.Nat64], ['query']),
        getTimerStarted: IDL.Func([], [IDL.Bool], ['query']),
        measureSum: IDL.Func([IDL.Nat32, IDL.Bool], [IDL.Nat64], []),
        measureSumTimer: IDL.Func([IDL.Nat32, IDL.Bool], [], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
