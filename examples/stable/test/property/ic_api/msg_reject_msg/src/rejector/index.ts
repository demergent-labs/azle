import { IDL, msgReject, query } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text, { manual: true })
    echoReject(message: string): void {
        msgReject(`reject_message proptest message: ${message}`);
    }
}
