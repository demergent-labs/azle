# text

The `CandidType` object `text` corresponds to the [Candid type text](https://internetcomputer.org/docs/current/references/candid-ref#type-text), is inferred to be a TypeScript `string`, and will be decoded into a [JavaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) at runtime.

TypeScript or JavaScript:

```typescript
import { Canister, query, text } from 'azle';

export default Canister({
    getString: query([], text, () => {
        return 'Hello world!';
    }),
    printString: query([text], text, (string) => {
        console.log(typeof string);
        return string;
    })
});
```

Candid:

```
service : () -> {
    getString : () -> (text) query;
    printString : (text) -> (text) query;
}
```

dfx:

```bash
dfx canister call candid_canister printString '("Hello world!")'
("Hello world!")
```
