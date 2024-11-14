import { IDL, query, reject, reply } from 'azle';

export default class {
    @query([], IDL.Text)
    throwError(): string {
        throw new Error('Thrown error');
    }

    @query([], IDL.Text, { manual: true })
    rejectWithMessage(): void {
        reject('Rejection with message');
    }

    @query([], undefined, { manual: true })
    noError(): void {
        reply({ data: undefined });
    }
}
