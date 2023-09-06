import { bool, query, Service, update, Void } from 'azle';

let notified: boolean = false;

export default class extends Service {
    @update([], Void)
    receiveNotification(): Void {
        notified = true;
    }

    @query([], bool)
    getNotified(): bool {
        return notified;
    }
}
