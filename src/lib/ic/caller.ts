export function caller() {
    const callerBytes = globalThis._azleIc.caller();
    return Principal.fromUint8Array(new Uint8Array(callerBytes));
}
