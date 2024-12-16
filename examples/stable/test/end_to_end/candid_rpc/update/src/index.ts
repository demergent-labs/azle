import { IDL, query, update } from 'azle';

export default class {
    currentMessage: string = '';

    @query([], IDL.Text)
    getCurrentMessage(): string {
        return this.currentMessage;
    }

    @update([IDL.Text])
    simpleUpdate(message: string): void {
        this.currentMessage = message;
    }
}
