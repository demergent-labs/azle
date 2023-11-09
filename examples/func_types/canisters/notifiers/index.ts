import { Canister, ic, Principal, query, blob, Func, Void } from 'azle';

export const NotifierFunc = Func([blob], Void, 'oneway');
export type NotifierFunc = typeof NotifierFunc.tsType;

export default Canister({
    getNotifier: query([], NotifierFunc, () => {
        return [
            Principal.fromText(
                process.env.NOTIFIERS_PRINCIPAL ??
                    ic.trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
            ),
            'notify'
        ];
    })
});
