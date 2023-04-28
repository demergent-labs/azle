import { $init, Opt, Principal, $query, Record, Variant } from 'azle';

type User = Record<{
    id: string;
}>;

type Reaction = Variant<{
    Fire: null;
    Wave: null;
}>;

let user: Opt<User> = Opt.None;
let reaction: Opt<Reaction> = Opt.None;
let owner: Opt<Principal> = Opt.None;

$init;
export function init(
    initUser: User,
    initReaction: Reaction,
    initOwner: Principal
): void {
    user = Opt.Some(initUser);
    reaction = Opt.Some(initReaction);
    owner = Opt.Some(initOwner);
}

$query;
export function getUser(): Opt<User> {
    return user;
}

$query;
export function getReaction(): Opt<Reaction> {
    return reaction;
}

$query;
export function getOwner(): Opt<Principal> {
    return owner;
}
