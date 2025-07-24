import { IDL, msgArgData, msgReject, query } from 'azle';

export default class {
    @query([IDL.Text], IDL.Empty, { manual: true })
    reject(): void {
        const argData = msgArgData();

        const message = IDL.decode([IDL.Text], argData)[0] as string;

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
