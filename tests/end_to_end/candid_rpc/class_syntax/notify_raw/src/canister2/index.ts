import { IDL, query, update } from 'azle';

let notified: boolean = false;

export default class {
    @update([])
    receiveNotification() {
        notified = true;
    }
    @query([], IDL.Bool)
    getNotified() {
        return notified;
    }
}
