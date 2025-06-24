# @dfinity/candid IDL

For each of your canister's methods, deserialization of incoming arguments and serialization of return values is handled with a combination of decorators and the <a href="https://agent-js.icp.xyz/candid/modules/IDL.html" target="_blank">IDL</a> object from the <a href="https://agent-js.icp.xyz/candid/index.html" target="_blank">@dfinity/candid</a> library.

`IDL` is re-exported by Azle, and has properties that correspond to <a href="https://internetcomputer.org/docs/references/candid-ref" target="_blank">Candid's supported types</a>.

## Basic Types

```typescript
import { IDL } from 'azle';

// Text
IDL.Text;

// Numbers
IDL.Nat; // Unlimited precision unsigned integer
IDL.Nat64; // 64-bit unsigned integer
IDL.Nat32; // 32-bit unsigned integer
IDL.Nat16; // 16-bit unsigned integer
IDL.Nat8; // 8-bit unsigned integer

IDL.Int; // Unlimited precision signed integer
IDL.Int64; // 64-bit signed integer
IDL.Int32; // 32-bit signed integer
IDL.Int16; // 16-bit signed integer
IDL.Int8; // 8-bit signed integer

// Floating point
IDL.Float64; // 64-bit floating point
IDL.Float32; // 32-bit floating point

// Boolean and null
IDL.Bool;
IDL.Null;
```

## Complex Types

```typescript
import { IDL } from 'azle';

// Vector (array)
IDL.Vec(IDL.Text); // Array of text
IDL.Vec(IDL.Nat8); // Blob (array of bytes)

// Optional
IDL.Opt(IDL.Text); // Optional text

// Record (object)
IDL.Record({
    name: IDL.Text,
    age: IDL.Nat8,
    active: IDL.Bool
});

// Variant (union type)
IDL.Variant({
    Success: IDL.Text,
    Error: IDL.Text,
    Loading: IDL.Null
});
```

## Advanced Types

```typescript
import { IDL } from 'azle';

// Function reference
IDL.Func([IDL.Text], [IDL.Bool], ['query']);

// Service reference
IDL.Service({
    getName: IDL.Func([], [IDL.Text], ['query']),
    setName: IDL.Func([IDL.Text], [], ['update'])
});

// Principal
IDL.Principal;

// Reserved and Empty
IDL.Reserved;
IDL.Empty;
```

## Usage Example

```typescript
import { IDL, query, update } from 'azle';

const User = IDL.Record({
    name: IDL.Text,
    email: IDL.Text,
    age: IDL.Nat8
});
type User = {
    name: string;
    email: string;
    age: number;
};

export default class {
    @query([IDL.Text], IDL.Opt(User))
    getUser(id: string): [User] | [] {
        // Implementation here
        return [];
    }

    @update([User], IDL.Bool)
    createUser(user: User): boolean {
        // Implementation here
        return true;
    }
}
```
