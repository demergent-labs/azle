import { bool, Canister, query, update, Void } from 'azle/experimental';

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
