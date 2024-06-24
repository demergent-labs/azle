import { IDL, query, update } from 'azle';

let currentMessage: string = '';

export default class {
    @query([], IDL.Text)
    getCurrentMessage(): string {
        return currentMessage;
    }

    @update([IDL.Text])
    simpleUpdate(message: string): void {
        currentMessage = message;
    }
}
