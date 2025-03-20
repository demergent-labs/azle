import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    getAzleVersionFromWSibling(): string {
        return '0.30.0';
    }
}
