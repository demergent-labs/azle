import { blob, $query, Vec } from 'azle';
import encodeUtf8 from 'encode-utf8';

$query;
export function getBlob(): blob {
    return stringToBlob('hello');
}

$query;
export function getBlobs(): Vec<blob> {
    return [stringToBlob('hello'), stringToBlob('world')];
}

function stringToBlob(string: string): blob {
    return new Uint8Array(encodeUtf8(string));
}
