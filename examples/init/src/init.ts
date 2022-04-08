import {
    Init,
    Opt,
    Query,
    Variant,
    Principal
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
let owner: Opt<Principal> = null;

export function init(
    initUser: User,
    initReaction: Reaction,
    initOwner: Principal
): Init {
    user = initUser;
    reaction = initReaction;
    owner = initOwner;
}

export function getUser(): Query<Opt<User>> {
    return user;
}

export function getReaction(): Query<Opt<Reaction>> {
    return reaction;
}

export function getOwner(): Query<Opt<Principal>> {
    return owner;
}