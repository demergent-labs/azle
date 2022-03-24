import {
    Query,
    Update
} from 'azle';

let currentMessage: string = '';

export function query(): Query<string> {
    return currentMessage;
}

export function update(message: string): Update<void> {
    currentMessage = message;
}