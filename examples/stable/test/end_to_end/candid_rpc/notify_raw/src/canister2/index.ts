import { IDL, query, update } from 'azle';

export default class {
    notified: boolean = false;

    @update([])
    receiveNotification(): void {
        this.notified = true;
    }

    @query([], IDL.Bool)
    getNotified(): boolean {
        return this.notified;
    }
}
