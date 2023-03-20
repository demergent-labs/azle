# func

This section is a work in progress.

The Azle type `func` corresponds to the [Candid type func](https://internetcomputer.org/docs/current/references/candid-ref#type-func---) and will become a [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) with two elements at runtime.

The first element is an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) and the second is a [JavaScript string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). The `@dfinity/principal` represents the `principal` of the canister/service where the function exists, and the `string` represents the function's name.

A `func` acts as a callback, allowing the `func` receiver to know which canister instance and method must be used to call back.

TypeScript:

```typescript
import { Func, Principal, $query, Query } from 'azle';

type BasicFunc = Func<Query<(param1: string) => string>>;

$query;
export function getBasicFunc(): BasicFunc {
    return [Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'), 'getBasicFunc'];
}

$query;
export function printBasicFunc(basic_func: BasicFunc): BasicFunc {
    console.log(typeof basic_func);
    return basic_func;
}
```

Candid:

```
service : () -> {
    getBasicFunc : () -> (func (text) -> (text) query) query;
    printBasicFunc : (func (text) -> (text) query) -> (
        func (text) -> (text) query,
      ) query;
}
```

dfx:

```bash
dfx canister call candid_canister printBasicFunc '(func "r7inp-6aaaa-aaaaa-aaabq-cai".getBasicFunc)'
(func "r7inp-6aaaa-aaaaa-aaabq-cai".getBasicFunc)
```
