import {
    Canister,
    init,
    None,
    Null,
    Opt,
    Principal,
    query,
    Record,
    Some,
    text,
    Variant
} from 'azle';

const User = Record({
    id: text
});
type User = typeof User.tsType;

const Reaction = Variant({
    Fire: Null,
    Wave: Null
});
type Reaction = typeof Reaction.tsType;

let user: Opt<User> = None;
let reaction: Opt<Reaction> = None;
let owner: Opt<Principal> = None;

export default Canister({
    init: init(
        [User, Reaction, Principal],
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
    getOwner: query([], Opt(Principal), () => {
        return owner;
    })
});
