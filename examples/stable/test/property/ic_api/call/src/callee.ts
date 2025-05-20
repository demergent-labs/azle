import { IDL, query, update } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text)
    echo(message: string): string {
        return message;
    }

    @update([IDL.Text], IDL.Text)
    echoUpdate(message: string): string {
        return message;
    }
}
