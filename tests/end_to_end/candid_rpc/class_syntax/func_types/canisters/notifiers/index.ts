import { IDL, query } from 'azle';

export const NotifierFunc = Func([IDL.Vec(IDL.Nat8)], 'oneway');
export type NotifierFunc = typeof NotifierFunc.tsType;

export default class {
    @query([], NotifierFunc)
    getNotifier() {
        return [
            Principal.fromText(
                process.env.NOTIFIERS_PRINCIPAL ??
                    ic.trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
            ),
            'notify'
        ];
    }
}
