export function getArrayStringForTypeObject(typeObject: string): string {
    if (typeObject === 'IDL.Int64') {
        return 'BigInt64Array.from';
    }

    if (typeObject === 'IDL.Int32') {
        return 'Int32Array.from';
    }

    if (typeObject === 'IDL.Int16') {
        return 'Int16Array.from';
    }

    if (typeObject === 'IDL.Int8') {
        return 'Int8Array.from';
    }

    if (typeObject === 'IDL.Nat64') {
        return 'BigUint64Array.from';
    }

    if (typeObject === 'IDL.Nat32') {
        return 'Uint32Array.from';
    }

    if (typeObject === 'IDL.Nat16') {
        return 'Uint16Array.from';
    }

    if (typeObject === 'IDL.Nat8') {
        return 'Uint8Array.from';
    }

    return 'Array.from';
}

export function getArrayForCandidTypeObject(typeObject: string): any {
    if (typeObject === 'IDL.Int64') {
        return BigInt64Array;
    }

    if (typeObject === 'IDL.Int32') {
        return Int32Array;
    }

    if (typeObject === 'IDL.Int16') {
        return Int16Array;
    }

    if (typeObject === 'IDL.Int8') {
        return Int8Array;
    }

    if (typeObject === 'IDL.Nat64') {
        return BigUint64Array;
    }

    if (typeObject === 'IDL.Nat32') {
        return Uint32Array;
    }

    if (typeObject === 'IDL.Nat16') {
        return Uint16Array;
    }

    if (typeObject === 'IDL.Nat8') {
        return Uint8Array;
    }

    return Array;
}

export function getArrayTypeAnnotation(
    typeObject: string,
    typeAnnotation: string
): string {
    if (typeObject === 'IDL.Int64') {
        return 'BigInt64Array';
    }

    if (typeObject === 'IDL.Int32') {
        return 'Int32Array';
    }

    if (typeObject === 'IDL.Int16') {
        return 'Int16Array';
    }

    if (typeObject === 'IDL.Int8') {
        return 'Int8Array';
    }

    if (typeObject === 'IDL.Nat64') {
        return 'BigUint64Array';
    }

    if (typeObject === 'IDL.Nat32') {
        return 'Uint32Array';
    }

    if (typeObject === 'IDL.Nat16') {
        return 'Uint16Array';
    }

    if (typeObject === 'IDL.Nat8') {
        return 'Uint8Array';
    }

    return `(${typeAnnotation})[]`;
}
