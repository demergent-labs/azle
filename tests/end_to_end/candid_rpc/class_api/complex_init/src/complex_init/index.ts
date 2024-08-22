import { IDL, init, query } from 'azle';

const User = IDL.Record({
    id: IDL.Text
});
type User = { id: string };

let greeting = 'Hello User';
let user: [User] | [] = [];

export default class {
    @init([IDL.Tuple(IDL.Text, User)])
    init(tuple: [string, User]): void {
        greeting = tuple[0];
        user = [tuple[1]];
        return undefined;
    }

    @query([], IDL.Text)
    greetUser(): string {
        return `${greeting} ${user[0]?.id ?? '??'}`;
    }
}
