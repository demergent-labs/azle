import { IDL, Principal, query, trap } from 'azle';

export const NotifierFunc = IDL.Func([IDL.Vec(IDL.Nat8)], [], ['oneway']);
export type NotifierFunc = [Principal, string];

export default class {
    @query([], NotifierFunc)
    getNotifier(): NotifierFunc {
        return [
            Principal.fromText(
                process.env.NOTIFIERS_PRINCIPAL ??
                    trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
            ),
            'notify'
        ];
    }
}
