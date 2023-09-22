import { ic, Principal, query, blob, Func, Service, Void, func } from 'azle';

@func([blob], Void, 'oneway')
export class NotifierFunc extends Func {}

export default class extends Service {
    @query([], NotifierFunc)
    getNotifier(): NotifierFunc {
        return new NotifierFunc(
            Principal.fromText(
                process.env.NOTIFIERS_PRINCIPAL ??
                    ic.trap('process.env.NOTIFIERS_PRINCIPAL is undefined')
            ),
            'notify'
        );
    }
}
