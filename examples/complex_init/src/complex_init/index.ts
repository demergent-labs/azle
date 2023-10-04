import {
    Canister,
    init,
    None,
    Opt,
    query,
    Record,
    Some,
    text,
    Tuple
} from 'azle';

const User = Record({
    id: text
});

let greeting: text = 'Hello User';
let user: Opt<typeof User> = None;

export default Canister({
    init: init([Tuple(text, User)], (tuple) => {
        greeting = tuple[0];
        user = Some(tuple[1]);
        return undefined;
    }),
    greetUser: query([], text, () => {
        return `${greeting} ${user.Some?.id ?? '??'}`;
    })
});
