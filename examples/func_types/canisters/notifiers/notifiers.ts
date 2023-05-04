import { ic, Principal, $query } from 'azle';
import { NotifierFunc } from './types';

$query;
export function getNotifier(): NotifierFunc {
    return [
        Principal.fromText(
            process.env.NOTIFIERS_PRINCIPAL ??
                ic.trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
        ),
        'notify'
    ];
}
