import { IDL, query, update } from 'azle';

let notified: boolean = false;

export default class {
    @update([])
    receiveNotification(): void {
        notified = true;
    }

    @query([], IDL.Bool)
    getNotified(): boolean {
        return notified;
    }
}
