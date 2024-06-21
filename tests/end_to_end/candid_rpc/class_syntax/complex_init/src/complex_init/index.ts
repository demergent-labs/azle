import { IDL, query, update } from 'azle';

const User = Record({
    id: text
});
type User = typeof User.tsType;

let greeting: text = 'Hello User';
let user: Opt<User> = None;

export default class {
    @init([Tuple(text, User)])
    init(tuple) {
        greeting = tuple[0];
        user = Some(tuple[1]);
        return undefined;
    }
    @query([], text)
    greetUser() {
        return `${greeting} ${user.Some?.id ?? '??'}`;
    }
}
