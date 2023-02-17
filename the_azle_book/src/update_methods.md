# Update Methods

[~900 update calls per second in the best case](https://forum.dfinity.org/t/what-is-the-theroretical-number-for-txns-per-second-on-internet-computer-right-now/14039/6?u=lastmjs).

```typescript
import { nat64, Opt, $query, $update } from 'azle';

type Db = {
    last_id: number;
    users: {
        [key: string]: User;
    };
};

type User = {
    id: string;
    username: string;
};

let db: Db = {
    last_id: 0,
    users: {}
};

// TODO I am trying to fill up the database but I am struggling to fill it up and to reach the query limit

$query;
export function get_user_by_username(username: string): Opt<User> {
    const db_values: User[] = Object.values(db.users);
    const user: User | undefined = db_values.find(
        (user) => user.username === username
    );

    return user ?? null;
}

$query;
export function get_users(): User[] {
    return Object.values(db.users);
}

$update;
export function seed_users(num_users: nat64): void {
    for (let i = 0; i < num_users; i++) {
        const last_id: number = db.last_id;
        const next_id: number = last_id + 1;
        const id: string = next_id.toString();
        const user: User = {
            id,
            username: `user${id}`
        };

        db.users[id] = user;
        db.last_id = next_id;
    }
}

$update;
export function create_user(username: string): User {
    const last_id: number = db.last_id;
    const next_id: number = last_id + 1;
    const id: string = next_id.toString();
    const user: User = {
        id: Object.keys(db.users).length.toString(),
        username
    };

    db.users[id] = user;
    db.last_id = next_id;

    return user;
}
```
