import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    simpleQuery(): string {
        return 'This is a query function';
    }

    @query([], IDL.Text)
    '\\simpleQ"uery'(): string {
        return 'This is a query function';
    }
}
