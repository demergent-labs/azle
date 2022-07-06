export const idlFactory = ({ IDL }) => {
    const StableMemoryError = IDL.Variant({
        OutOfBounds: IDL.Null,
        OutOfMemory: IDL.Null
    });
    const StableGrowResult = IDL.Variant({
        ok: IDL.Nat32,
        err: StableMemoryError
    });
    return IDL.Service({
        stable64_size: IDL.Func([], [IDL.Nat64], ['query']),
        stable_grow: IDL.Func([IDL.Nat32], [StableGrowResult], []),
        stable_size: IDL.Func([], [IDL.Nat32], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
