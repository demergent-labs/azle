import { Query, Update } from 'azle';

let notified: boolean = false;

export function receive_notification(): Update<void> {
    notified = true;
}

export function get_notified(): Query<boolean> {
    return notified;
}
