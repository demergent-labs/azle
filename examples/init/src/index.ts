import {
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

const User = Record({
    id: text
});

const Reaction = Variant({
    Fire: Null,
    Wave: Null
});

let user: Opt<typeof User> = None;
let reaction: Opt<typeof Reaction> = None;
let owner: Opt<Principal> = None;

export default Service({
    init: init(
        [User, Reaction, principal],
        (initUser, initReaction, initOwner) => {
            user = Some(initUser);
            reaction = Some(initReaction);
            owner = Some(initOwner);
        }
    ),
    getUser: query([], Opt(User), () => {
        return user;
    }),
    getReaction: query([], Opt(Reaction), () => {
        return reaction;
    }),
    getOwner: query([], Opt(principal), () => {
        return owner;
    })
});
