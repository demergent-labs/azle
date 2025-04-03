import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    getAzleVersionFromAncestorCurrent(): string {
        if (process.env.AZLE_VERSION !== undefined) {
            return process.env.AZLE_VERSION;
        }
        throw new Error('AZLE_VERSION is not set');
    }
}
