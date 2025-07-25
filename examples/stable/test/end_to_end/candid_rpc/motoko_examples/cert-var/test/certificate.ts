import { Certificate, LookupPathStatus, NodePath } from '@dfinity/agent';

export function findLookupValueOrThrow(
    certificate: Certificate,
    path: NodePath
): Uint8Array {
    const lookupResult = certificate.lookup_path(path);

    if (lookupResult.status !== LookupPathStatus.Found) {
        throw new Error('No value found');
    }

    return lookupResult.value;
}
