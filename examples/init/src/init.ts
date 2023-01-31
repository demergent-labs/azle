import { $init, Opt, $query, Variant, Principal } from 'azle';

type User = {
    id: string;
};

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
export function get_user(): Opt<User> {
    return user;
}

$query;
export function get_reaction(): Opt<Reaction> {
    return reaction;
}

$query;
export function get_owner(): Opt<Principal> {
    return owner;
}
