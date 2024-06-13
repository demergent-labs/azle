import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    simpleQuery(): string {
        return 'This is a query function';
    }
}
