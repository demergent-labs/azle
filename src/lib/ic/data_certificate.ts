export function dataCertificate() {
    const rawRustValue: ArrayBuffer | undefined =
        globalThis._azleIc.dataCertificate();

    return rawRustValue === undefined
        ? None
        : Some(new Uint8Array(rawRustValue));
}
