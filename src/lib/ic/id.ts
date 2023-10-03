export function id() {
    // TODO consider bytes instead of string, just like with caller
    const idString = globalThis._azleIc.id();
    return Principal.fromText(idString);
}
