export function isController(principal) {
    return globalThis._azleIc.isController(principal.toUint8Array().buffer);
}
