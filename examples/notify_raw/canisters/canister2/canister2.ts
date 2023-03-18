import { $query, $update } from 'azle';

let notified: boolean = false;

$update;
export function receiveNotification(): void {
    notified = true;
}

$query;
export function getNotified(): boolean {
    return notified;
}
