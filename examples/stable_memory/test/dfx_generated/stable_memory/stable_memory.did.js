export const idlFactory = ({ IDL }) => {
    const StableMemoryError = IDL.Variant({
        OutOfBounds: IDL.Null,
        OutOfMemory: IDL.Null
    });
    const Stable64GrowResult = IDL.Variant({
        ok: IDL.Nat64,
        err: StableMemoryError
    });
    const StableGrowResult = IDL.Variant({
        ok: IDL.Nat32,
        err: StableMemoryError
    });
    return IDL.Service({
        stable64_grow: IDL.Func([IDL.Nat64], [Stable64GrowResult], []),
        stable64_read: IDL.Func(
            [IDL.Nat64, IDL.Nat64],
            [IDL.Vec(IDL.Nat8)],
            ['query']
        ),
        stable64_size: IDL.Func([], [IDL.Nat64], ['query']),
        stable64_write: IDL.Func([IDL.Nat64, IDL.Vec(IDL.Nat8)], [], []),
        stable_bytes: IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
        stable_grow: IDL.Func([IDL.Nat32], [StableGrowResult], []),
        stable_read: IDL.Func(
            [IDL.Nat32, IDL.Nat32],
            [IDL.Vec(IDL.Nat8)],
            ['query']
        ),
        stable_size: IDL.Func([], [IDL.Nat32], ['query']),
        stable_write: IDL.Func([IDL.Nat32, IDL.Vec(IDL.Nat8)], [], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
