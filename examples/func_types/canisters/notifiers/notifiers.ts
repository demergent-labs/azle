import { Principal, Query } from 'azle';
import { NotifierFunc } from './types';

export function get_notifier(): Query<NotifierFunc> {
    return [Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'), 'notify'];
}
