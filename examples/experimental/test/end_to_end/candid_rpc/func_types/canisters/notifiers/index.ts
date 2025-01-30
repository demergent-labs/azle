import { trap } from 'azle';
import {
    blob,
    Canister,
    Func,
    Principal,
    query,
    Void
} from 'azle/experimental';

export const NotifierFunc = Func([blob], Void, 'oneway');
export type NotifierFunc = typeof NotifierFunc.tsType;

export default Canister({
    getNotifier: query([], NotifierFunc, () => {
        return [
            Principal.fromText(
                process.env.NOTIFIERS_PRINCIPAL ??
                    trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
            ),
            'notify'
        ];
    })
});
