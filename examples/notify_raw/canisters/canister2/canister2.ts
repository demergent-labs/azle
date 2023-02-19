import { $query, $update } from 'azle';

let notified: boolean = false;

$update;
export function receive_notification(): void {
    notified = true;
}

$query;
export function get_notified(): boolean {
    return notified;
}
