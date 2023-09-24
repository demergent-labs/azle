import { init, Opt, query, Record, Service, text, Tuple } from 'azle';

const User = Record({
    id: text
});

let greeting: text = 'Hello User';
let user: Opt<typeof User> = [];

// TODO tuple types aren't done, they don't have TypeScript types
export default Service({
    init: init([Tuple(text, User)], (tuple) => {
        greeting = tuple[0];
        user = [tuple[1]];
        return undefined;
    }),
    greetUser: query([], text, () => {
        return `${greeting} ${user[0]?.id ?? '??'}`;
    })
});
