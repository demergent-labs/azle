import { Certificate, LookupResultFound } from '@dfinity/agent';

export function findLookupValueOrThrow(
    certificate: Certificate,
    path: (ArrayBuffer | string)[]
): ArrayBuffer {
    const lookup = findLookupOrThrow(certificate, path);
    return getValueAsArrayBufferOrThrow(lookup);
}

function findLookupOrThrow(
    certificate: Certificate,
    path: (ArrayBuffer | string)[]
): LookupResultFound {
    const lookup = certificate.lookup(path);
    if (lookup.status !== 'found') {
        throw new Error('No value found');
    }
    return lookup as LookupResultFound;
}

function getValueAsArrayBufferOrThrow(lookup: LookupResultFound): ArrayBuffer {
    const value = lookup.value;
    if (ArrayBuffer.isView(value) === false) {
        if (value instanceof ArrayBuffer === false) {
            throw new Error('Value is not an ArrayBuffer');
        }
    }
    return value as ArrayBuffer;
}
