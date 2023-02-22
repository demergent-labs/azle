# text

This section is a work in progress.

The TypeScript type `string` corresponds to the [Candid type text](https://internetcomputer.org/docs/current/references/candid-ref#type-text) and will become a [JavaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) at runtime.

TypeScript:

```typescript
import { $query } from 'azle';

$query;
export function get_string(): string {
    return 'Hello world!';
}

$query;
export function print_string(string: string): string {
    console.log(typeof string);
    return string;
}
```

Candid:

```
service : () -> {
    get_string : () -> (text) query;
    print_string : (text) -> (text) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_string '("Hello world!")'
("Hello world!")
```
