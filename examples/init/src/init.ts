import { Init, Opt, Query, Variant, Principal } from 'azle';

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

export function init_(
    initUser: User,
    initReaction: Reaction,
    initOwner: Principal
): Init {
    user = initUser;
    reaction = initReaction;
    owner = initOwner;
}

export function get_user(): Query<Opt<User>> {
    return user;
}

export function get_reaction(): Query<Opt<Reaction>> {
    return reaction;
}

export function get_owner(): Query<Opt<Principal>> {
    return owner;
}

// class API

import { init, query } from 'azle';

export default class {
    user: Opt<User> = null;
    reaction: Opt<Reaction> = null;
    owner: Opt<Principal> = null;

    @init
    init_(init_user: User, init_reaction: Reaction, init_owner: Principal) {
        this.user = init_user;
        this.reaction = init_reaction;
        this.owner = init_owner;
    }

    @query
    get_user(): Opt<User> {
        return this.user;
    }

    @query
    get_reaction(): Opt<Reaction> {
        return this.reaction;
    }

    @query
    get_owner(): Opt<Principal> {
        return this.owner;
    }
}
