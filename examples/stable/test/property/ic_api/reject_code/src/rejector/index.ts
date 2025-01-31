import { IDL, msgReject, query } from 'azle';

export default class {
    @query([], IDL.Text)
    throwError(): string {
        throw new Error('Thrown error');
    }

    @query([], IDL.Text, { manual: true })
    rejectWithMessage(): void {
        msgReject('Rejection with message');
    }

    @query
    noError(): void {}
}
