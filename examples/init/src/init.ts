import {
    Init,
    Opt,
    Query,
    Variant
} from 'azle';

type User = {
    id: string;
};

type Reaction = Variant<{
    Fire?: null;
    Wave?: null
}>;

let user: Opt<User> = null;
let reaction: Opt<Reaction> = null;

export function init(
    initUser: User,
    initReaction: Reaction
): Init {
    user = initUser;
    reaction = initReaction;
}

export function getUser(): Query<Opt<User>> {
    return user;
}

export function getReaction(): Query<Opt<Reaction>> {
    return reaction;
}