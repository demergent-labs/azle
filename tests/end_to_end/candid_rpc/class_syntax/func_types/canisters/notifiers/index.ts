import {
    blob,

    Func,
    ic,
    Principal,
    query,
    Void
} from 'azle';

export const NotifierFunc = Func([blob], Void, 'oneway');
export type NotifierFunc = typeof NotifierFunc.tsType;

export default class {
@query([], NotifierFunc)
    getNotifier(){
        return [
            Principal.fromText(
                process.env.NOTIFIERS_PRINCIPAL ??
                    ic.trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
            ),
            'notify'
        ];
    })
}
