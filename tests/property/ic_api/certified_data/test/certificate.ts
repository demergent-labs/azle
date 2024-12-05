import { Certificate, LookupResultFound } from '@dfinity/agent';

export function findLookupValueOrThrow(
    cert: Certificate,
    path: (ArrayBuffer | string)[]
): ArrayBuffer {
    const lookup = findLookupOrThrow(cert, path);
    return getValueAsArrayBufferOrThrow(lookup);
}

function findLookupOrThrow(
    cert: Certificate,
    path: (ArrayBuffer | string)[]
): LookupResultFound {
    const lookup = cert.lookup(path);
    if (lookup.status !== 'found') {
        throw new Error('No value found');
    }
    return lookup as LookupResultFound;
}

function getValueAsArrayBufferOrThrow(lookup: LookupResultFound): ArrayBuffer {
    const value = lookup.value;
    if (!ArrayBuffer.isView(value) && !(value instanceof ArrayBuffer)) {
        throw new Error('Value is not an ArrayBuffer');
    }
    return value as ArrayBuffer;
}
