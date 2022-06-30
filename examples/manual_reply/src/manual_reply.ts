import { ic, QueryManual, UpdateManual } from 'azle';

export function manual_query(message: string): QueryManual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    // TODO: implement this
    // ic.reply('accepted');
}

export function manual_update(message: string): UpdateManual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    // TODO: implement this
    // ic.reply('accepted');
}
