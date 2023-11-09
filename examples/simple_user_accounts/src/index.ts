import {
    Canister,
    None,
    Opt,
    query,
    Record,
    Some,
    text,
    update,
    Vec
} from 'azle';

type Db = {
    users: {
        [id: string]: User;
    };
};

let db: Db = {
    users: {}
};

const User = Record({
    id: text,
    username: text
});
type User = typeof User.tsType;

export default Canister({
    getUserById: query([text], Opt(User), (id) => {
        const userOrUndefined = db.users[id];
        return userOrUndefined ? Some(userOrUndefined) : None;
    }),
    getAllUsers: query([], Vec(User), () => {
        return Object.values(db.users);
    }),
    createUser: update([text], User, (username) => {
        const id = Object.keys(db.users).length.toString();
        const user: User = {
            id,
            username
        };

        db.users[id] = user;

        return user;
    })
});
