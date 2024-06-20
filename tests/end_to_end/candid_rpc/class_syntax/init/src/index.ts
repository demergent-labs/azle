import { IDL, init, Principal, query } from 'azle';

const User = IDL.Record({
    id: IDL.Text
});
type User = {
    id: string;
};

const Reaction = IDL.Variant({
    Fire: IDL.Null,
    Wave: IDL.Null
});
type Reaction = { Fire: null } | { Wave: null };

let user: [User] | [] = [];
let reaction: [Reaction] | [] = [];
let owner: [Principal] | [] = [];

export default class {
    @init([User, Reaction, IDL.Principal])
    init(initUser: User, initReaction: Reaction, initOwner: Principal) {
        user = [initUser];
        reaction = [initReaction];
        owner = [initOwner];
    }

    @query([], IDL.Opt(User))
    getUser(): [User] | [] {
        return user;
    }

    @query([], IDL.Opt(Reaction))
    getReaction(): [Reaction] | [] {
        return reaction;
    }

    @query([], IDL.Opt(IDL.Principal))
    getOwner(): [Principal] | [] {
        return owner;
    }
}
