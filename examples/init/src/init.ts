import { $init, Opt, Principal, $query, Record, Variant } from 'azle';

type User = Record<{
    id: string;
}>;

type Reaction = Variant<{
    Fire: null;
    Wave: null;
}>;

let user: Opt<User> = null;
let reaction: Opt<Reaction> = null;
let owner: Opt<Principal> = null;

$init;
export function init(
    initUser: User,
    initReaction: Reaction,
    initOwner: Principal
) {
    user = initUser;
    reaction = initReaction;
    owner = initOwner;
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
