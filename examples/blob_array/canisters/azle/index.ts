import { blob, Query } from 'azle';
import encodeUtf8 from 'encode-utf8';

export function get_blob(): Query<blob> {
    return string_to_blob('hello');
}

export function get_blobs(): Query<blob[]> {
    return [string_to_blob('hello'), string_to_blob('world')];
}

function string_to_blob(string: string): blob {
    return new Uint8Array(encodeUtf8(string));
}
