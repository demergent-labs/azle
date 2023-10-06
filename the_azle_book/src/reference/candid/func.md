# func

Values created by the `CandidType` function `Func` correspond to the [Candid type func](https://internetcomputer.org/docs/current/references/candid-ref#type-func---), are inferred to be TypeScript `[Principal, string]` tuples, and will be decoded into [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) with two elements at runtime.

The first element is an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) and the second is a [JavaScript string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). The `@dfinity/principal` represents the `principal` of the canister/service where the function exists, and the `string` represents the function's name.

A `func` acts as a callback, allowing the `func` receiver to know which canister instance and method must be used to call back.

TypeScript or JavaScript:

```typescript
import { Canister, Func, Principal, query, text } from 'azle';

const BasicFunc = Func([text], text, 'query');

export default Canister({
    getBasicFunc: query([], BasicFunc, () => {
        return [
            Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
            'getBasicFunc'
        ];
    }),
    printBasicFunc: query([BasicFunc], BasicFunc, (basicFunc) => {
        console.log(typeof basicFunc);
        return basicFunc;
    })
});
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
