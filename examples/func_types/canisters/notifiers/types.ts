import { blob, CallResult, Func, Oneway, Service, serviceQuery } from 'azle';

export type NotifierFunc = Func<Oneway<(message: blob) => void>>;

export class Notifier extends Service {
    @serviceQuery
    getNotifier: () => CallResult<NotifierFunc>;
}
