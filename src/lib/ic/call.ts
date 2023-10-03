export function call(method, config) {
    // TODO probably get rid of .crossCanisterCallback
    return method.crossCanisterCallback(
        '_AZLE_CROSS_CANISTER_CALL',
        false,
        ic.callRaw,
        config?.cycles ?? 0n,
        ...(config?.args ?? [])
    );
}
