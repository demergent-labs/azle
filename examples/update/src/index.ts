import { query, text, update, Void } from 'azle';

let currentMessage: string = '';

export default class {
    @query([], text)
    getCurrentMessage(): text {
        return currentMessage;
    }

    @update([text], Void)
    simpleUpdate(message: text): Void {
        currentMessage = message;
    }
}
