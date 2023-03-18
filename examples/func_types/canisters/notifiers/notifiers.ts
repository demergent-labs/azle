import { Principal, $query } from 'azle';
import { NotifierFunc } from './types';

$query;
export function getNotifier(): NotifierFunc {
    return [Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'), 'notify'];
}
