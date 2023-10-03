export function call128(method, config) {
    return method.crossCanisterCallback(
        '_AZLE_CROSS_CANISTER_CALL',
        false,
        ic.callRaw128,
        config?.cycles ?? 0n,
        ...(config?.args ?? [])
    );
}
