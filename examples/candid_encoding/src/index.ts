import { blob, ic, $query } from 'azle';

// encodes a Candid string to Candid bytes
$query;
export function candidEncode(candidString: string): blob {
    return ic.candidEncode(candidString);
}

// decodes Candid bytes to a Candid string
$query;
export function candidDecode(candidEncoded: blob): string {
    return ic.candidDecode(candidEncoded);
}
