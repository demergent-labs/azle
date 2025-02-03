import { IDL, msgArgData, msgReject, query } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text, { manual: true })
    echoReject(): void {
        const message = IDL.decode([IDL.Text], msgArgData())[0] as string;

        msgReject(`reject_message proptest message: ${message}`);
    }
}
