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

export default class {
    user: [User] | [] = [];
    reaction: [Reaction] | [] = [];
    owner: [Principal] | [] = [];

    @init([User, Reaction, IDL.Principal])
    init(initUser: User, initReaction: Reaction, initOwner: Principal): void {
        this.user = [initUser];
        this.reaction = [initReaction];
        this.owner = [initOwner];
    }

    @query([], IDL.Opt(User))
    getUser(): [User] | [] {
        return this.user;
    }

    @query([], IDL.Opt(Reaction))
    getReaction(): [Reaction] | [] {
        return this.reaction;
    }

    @query([], IDL.Opt(IDL.Principal))
    getOwner(): [Principal] | [] {
        return this.owner;
    }
}
