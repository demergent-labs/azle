import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    getAzleVersionFromWDescendantSame(): string {
        return '0.30.0';
    }
}
