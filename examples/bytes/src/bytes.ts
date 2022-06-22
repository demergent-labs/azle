import { Query, blob } from 'azle';

export function get_bytes(bytes: blob): Query<blob> {
    return bytes;
}
