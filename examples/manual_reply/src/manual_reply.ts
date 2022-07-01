import { ic, QueryManual, UpdateManual } from 'azle';

// TODO test records and variants and other types

export function manual_query(message: string): QueryManual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}

export function manual_update(message: string): UpdateManual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}
