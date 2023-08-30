import { query, text, update, Void } from 'azle';

let currentMessage: string = '';

export default class {
    @query([], text)
    getCurrentMessage(): string {
        return currentMessage;
    }

    @update([text], Void)
    simpleUpdate(message: string): void {
        currentMessage = message;
    }
}
