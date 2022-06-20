import { Query, nat8 } from 'azle';

export function get_bytes(bytes: nat8[]): Query<nat8[]> {
    return bytes;
}