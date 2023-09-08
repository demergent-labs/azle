import {
    candid,
    init,
    None,
    Null,
    Opt,
    principal,
    Principal,
    query,
    Record,
    Service,
    Some,
    text,
    Variant
} from 'azle';

class User extends Record {
    @candid(text)
    id: text;
}

class Reaction extends Variant {
    @candid(Null)
    Fire: Null;

    @candid(Null)
    Wave: Null;
}

export default class extends Service {
    user: Opt<User> = None;
    reaction: Opt<Reaction> = None;
    owner: Opt<Principal> = None;

    @init([User, Reaction, principal])
    init(initUser: User, initReaction: Reaction, initOwner: Principal): void {
        this.user = Some(initUser);
        this.reaction = Some(initReaction);
        this.owner = Some(initOwner);
    }

    @query([], Opt(User))
    getUser(): Opt<User> {
        return this.user;
    }

    @query([], Opt(Reaction))
    getReaction(): Opt<Reaction> {
        return this.reaction;
    }

    @query([], Opt(principal))
    getOwner(): Opt<Principal> {
        return this.owner;
    }
}
