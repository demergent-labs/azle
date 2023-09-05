import {
    candid,
    init,
    Opt,
    query,
    record,
    Record,
    Service,
    text,
    Tuple,
    Void
} from 'azle';

@record
class User extends Record {
    @candid(text)
    id: text;
}

export default class extends Service {
    greeting: text = 'Hello User';
    user: Opt<User> = [];

    @init([Tuple(text, User)], Void)
    init(tuple: Tuple<[string, User]>): Void {
        this.greeting = tuple[0];
        this.user = [tuple[1]];
    }

    @query([], text)
    greetUser(): text {
        return `${this.greeting} ${this.user[0]?.id ?? '??'}`;
    }
}
