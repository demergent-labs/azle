import { IDL, query, update } from 'azle';

const User = Record({
    id: IDL.Text
});
type User = typeof User.tsType;

let greeting = 'Hello User';
let user: Opt<User> = None;

export default class {
    @init([Tuple(IDL.Text, User)])
    init(tuple) {
        greeting = tuple[0];
        user = Some(tuple[1]);
        return undefined;
    }
    @query([], IDL.Text)
    greetUser() {
        return `${greeting} ${user.Some?.id ?? '??'}`;
    }
}
