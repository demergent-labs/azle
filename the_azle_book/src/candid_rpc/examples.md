# Examples

Some of the best documentation for creating Candid RPC canisters is currently in <a href="https://github.com/demergent-labs/azle/tree/main/examples/stable/test/end_to_end/candid_rpc" target="_blank">the examples directory</a>.

## Basic Hello World

```typescript
import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    hello(): string {
        return 'Hello World!';
    }
}
```

## Counter with State

```typescript
import { IDL, query, update } from 'azle';

export default class {
    counter: number = 0;

    @query([], IDL.Nat32)
    get(): number {
        return this.counter;
    }

    @update([], IDL.Nat32)
    increment(): number {
        this.counter += 1;
        return this.counter;
    }

    @update([IDL.Nat32], IDL.Nat32)
    set(value: number): number {
        this.counter = value;
        return this.counter;
    }
}
```

## User Management

```typescript
import { IDL, msgCaller, Principal, query, update } from 'azle';

const User = IDL.Record({
    id: IDL.Principal,
    name: IDL.Text,
    age: IDL.Nat8
});
type User = {
    id: Principal;
    name: string;
    age: number;
};

export default class {
    users: Map<string, User> = new Map();

    @update([IDL.Text, IDL.Nat8], User)
    createUser(name: string, age: number): User {
        const caller = msgCaller();
        const user: User = {
            id: caller,
            name,
            age
        };

        this.users.set(caller.toText(), user);
        return user;
    }

    @query([], IDL.Vec(User))
    getUsers(): User[] {
        return Array.from(this.users.values());
    }

    @query([IDL.Principal], IDL.Opt(User))
    getUser(id: Principal): [User] | [] {
        const user = this.users.get(id.toText());
        return user !== undefined ? [user] : [];
    }
}
```
