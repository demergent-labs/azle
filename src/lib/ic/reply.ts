export function reply(data: any, type: CandidType): void {
    if (type.name === 'AzleVoid') {
        // return type is void
        const bytes = new Uint8Array(IDL.encode([], [])).buffer;
        return globalThis._azleIc.replyRaw(bytes);
    }

    const idlType = toIDLType(type, []);

    const encodeReadyResult = idlType.accept(new EncodeVisitor(), {
        js_class: type,
        js_data: data
    });

    const bytes = new Uint8Array(IDL.encode([idlType], [encodeReadyResult]))
        .buffer;
    return globalThis._azleIc.replyRaw(bytes);
}
