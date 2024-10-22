import { IDL, query, reject } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text, { manual: true })
    echoReject(message: string): void {
        reject(message);
    }

    @query([], IDL.Text)
    throwError(): string {
        throw new Error('Thrown error');
    }

    @query([], IDL.Text, { manual: true })
    rejectWithMessage(): void {
        reject('Rejection with message');
    }
}
