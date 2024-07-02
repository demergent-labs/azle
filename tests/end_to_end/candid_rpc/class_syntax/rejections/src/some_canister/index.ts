import { IDL, query, reject } from 'azle';

export default class {
    @query([IDL.Text], IDL.Empty, { manual: true })
    reject(message: string): void {
        reject(message);
    }

    @query([], IDL.Bool)
    accept(): boolean {
        return true;
    }

    @query([], IDL.Empty, { manual: true })
    error(): void {
        // This errors because neither ic.reject nor ic.reply were called
    }
}
