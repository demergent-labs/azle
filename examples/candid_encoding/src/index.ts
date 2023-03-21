import { blob, ic, $query } from 'azle';

// encodes a Candid string to Candid bytes
$query;
export function candid_encode(candid_string: string): blob {
    return ic.candidEncode(candid_string);
}

// decodes Candid bytes to a Candid string
$query;
export function candid_decode(candid_encoded: blob): string {
    return ic.candidDecode(candid_encoded);
}
