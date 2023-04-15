import { $init, Opt, $query, Record, Tuple } from 'azle';

type User = Record<{
    id: string;
}>;

let greeting: string = 'Hello User';
let user: Opt<User> = null;

$init;
export function init(tuple: Tuple<[string, User]>): void {
    greeting = tuple[0];
    user = tuple[1];
}

$query;
export function greetUser(): string {
    return `${greeting} ${user?.id ?? '??'}`;
}
