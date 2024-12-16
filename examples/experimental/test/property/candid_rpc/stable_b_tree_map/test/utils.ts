export function getArrayStringForCandidType(candidType: string): string {
    if (candidType === 'int64') {
        return 'BigInt64Array.from';
    }

    if (candidType === 'int32') {
        return 'Int32Array.from';
    }

    if (candidType === 'int16') {
        return 'Int16Array.from';
    }

    if (candidType === 'int8') {
        return 'Int8Array.from';
    }

    if (candidType === 'nat64') {
        return 'BigUint64Array.from';
    }

    if (candidType === 'nat32') {
        return 'Uint32Array.from';
    }

    if (candidType === 'nat16') {
        return 'Uint16Array.from';
    }

    if (candidType === 'nat8') {
        return 'Uint8Array.from';
    }

    return 'Array.from';
}

export function getArrayForCandidType(candidType: string): any {
    if (candidType === 'int64') {
        return BigInt64Array;
    }

    if (candidType === 'int32') {
        return Int32Array;
    }

    if (candidType === 'int16') {
        return Int16Array;
    }

    if (candidType === 'int8') {
        return Int8Array;
    }

    if (candidType === 'nat64') {
        return BigUint64Array;
    }

    if (candidType === 'nat32') {
        return Uint32Array;
    }

    if (candidType === 'nat16') {
        return Uint16Array;
    }

    if (candidType === 'nat8') {
        return Uint8Array;
    }

    return Array;
}
