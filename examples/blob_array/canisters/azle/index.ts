import { blob, $query } from 'azle';
import encodeUtf8 from 'encode-utf8';

$query;
export function get_blob(): blob {
    return string_to_blob('hello');
}

$query;
export function get_blobs(): blob[] {
    return [string_to_blob('hello'), string_to_blob('world')];
}

function string_to_blob(string: string): blob {
    return new Uint8Array(encodeUtf8(string));
}
