export function notify(method, config) {
    return method.crossCanisterCallback(
        '_AZLE_CROSS_CANISTER_CALL',
        true,
        ic.notifyRaw,
        config?.cycles ?? 0n,
        ...(config?.args ?? [])
    );
}
