import { IDL, query, reject } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text, { manual: true })
    echoReject(message: string): void {
        reject(`reject_message proptest message: ${message}`);
    }
}
