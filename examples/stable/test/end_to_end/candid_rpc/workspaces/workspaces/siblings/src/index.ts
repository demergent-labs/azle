import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    getAzleVersionFromSibling(): string {
        if (process.env.AZLE_AZLE_VERSION !== undefined) {
            return process.env.AZLE_AZLE_VERSION;
        }
        throw new Error('AZLE_AZLE_VERSION is not set');
    }
}
