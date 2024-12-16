import { IDL, init, query } from 'azle';

const User = IDL.Record({
    id: IDL.Text
});
type User = { id: string };

export default class {
    greeting = 'Hello User';
    user: [User] | [] = [];

    @init([IDL.Tuple(IDL.Text, User)])
    init(tuple: [string, User]): void {
        this.greeting = tuple[0];
        this.user = [tuple[1]];
        return undefined;
    }

    @query([], IDL.Text)
    greetUser(): string {
        return `${this.greeting} ${this.user[0]?.id ?? '??'}`;
    }
}
