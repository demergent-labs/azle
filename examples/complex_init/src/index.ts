import { $init, match, Opt, $query, Record, Tuple } from 'azle';

type User = Record<{
    id: string;
}>;

let greeting: string = 'Hello User';
let user: Opt<User> = Opt.None;

$init;
export function init(tuple: Tuple<[string, User]>): void {
    greeting = tuple[0];
    user = Opt.Some(tuple[1]);
}

$query;
export function greetUser(): string {
    return match(user, {
        Some: (some) => `${greeting} ${some.id}`,
        None: () => 'user is None'
    });
}
