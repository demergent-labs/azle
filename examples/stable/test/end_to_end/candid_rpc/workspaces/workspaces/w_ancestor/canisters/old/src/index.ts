import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    getAzleVersionFromWAncestorOld(): string {
        return '0.29.0';
    }
}
