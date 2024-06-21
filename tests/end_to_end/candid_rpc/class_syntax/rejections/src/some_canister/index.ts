import { IDL, query, reject } from 'azle';

export default class {
    @query([IDL.Text], IDL.Empty, { manual: true })
    reject(message: string) {
        reject(message);
    }

    @query([], IDL.Bool)
    accept() {
        return true;
    }

    @query([], IDL.Empty, { manual: true })
    error() {
        // This errors because neither ic.reject nor ic.reply were called
    }
}
