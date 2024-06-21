import { bool, query, update, Void } from 'azle';

let notified: boolean = false;

export default class {
    @update([], Void)
    receiveNotification() {
        notified = true;
    }
    @query([], bool)
    getNotified() {
        return notified;
    }
}
