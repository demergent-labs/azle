import { IDL, msgReject, query } from 'azle';

export default class {
    @query([IDL.Text], IDL.Empty, { manual: true })
    reject(message: string): void {
        msgReject(message);
    }

    @query([], IDL.Bool)
    accept(): boolean {
        return true;
    }

    @query([], IDL.Empty, { manual: true })
    error(): void {
        // This errors because neither msgReject nor msgReply were called
    }
}
