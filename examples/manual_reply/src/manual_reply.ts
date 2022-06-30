import { empty, ic, QueryManual, UpdateManual } from 'azle';

export function manual_query(message: string): QueryManual<empty> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    // TODO: implement this
    // ic.reply('accepted');
}

export function manual_update(message: string): UpdateManual<empty> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    // TODO: implement this
    // ic.reply('accepted');
}
