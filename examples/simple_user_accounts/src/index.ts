import {
    candid,
    None,
    Opt,
    query,
    Record,
    Service,
    Some,
    text,
    update,
    Variant,
    Null,
    Vec,
    float64
} from 'azle';

type Db = {
    users: {
        [id: string]: User;
    };
};

class Degrees extends Record {
    @candid(float64)
    degrees: float64;
}

class Temp extends Variant {
    @candid(Degrees)
    Hot: Degrees;

    @candid(Degrees)
    Cold: Degrees;
}

class User extends Record {
    @candid(text)
    id: text;

    @candid(text)
    username: text;

    @candid(Temp)
    temp: Temp;
}

export default class extends Service {
    db: Db = {
        users: {}
    };

    @query([text], Opt(User))
    getUserById(id: text): Opt<User> {
        const userOrUndefined = this.db.users[id];

        return userOrUndefined ? Some(userOrUndefined) : None;
    }

    @query([], Vec(User))
    getAllUsers(): Vec<User> {
        return Object.values(this.db.users);
    }

    @update([text], User)
    createUser(username: text): User {
        const id = Object.keys(this.db.users).length.toString();

        const user = {
            id,
            username,
            temp: Temp.create({ Hot: Degrees.create({ degrees: 1.23 }) })
        };

        this.db.users[id] = user;

        return user;
    }
}
