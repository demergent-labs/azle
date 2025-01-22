import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    simpleQuery(): string {
        return 'This is a query function';
    }

    @query([], IDL.Text, { hidden: true })
    hiddenQuery(): string {
        return 'This is a hidden query function';
    }

    @query([], IDL.Text, { hidden: false })
    visibleQuery(): string {
        return 'This is a visible query function';
    }
}
