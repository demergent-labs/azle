# variant

Objects created by the `CandidType` function `Variant` correspond to the [Candid variant type](https://internetcomputer.org/docs/current/references/candid-ref#type-variant--n--t--), are inferred to be TypeScript `Object`s, and will be decoded into [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

The shape of the object will match the object literal passed to the `Variant` function, however it will contain only one of the enumerated properties.

TypeScript or JavaScript:

```typescript
import { Canister, Null, query, Variant } from 'azle';

const Emotion = Variant({
    Happy: Null,
    Indifferent: Null,
    Sad: Null
});

const Reaction = Variant({
    Fire: Null,
    ThumbsUp: Null,
    Emotion: Emotion
});

export default Canister({
    getReaction: query([], Reaction, () => {
        return {
            Fire: null
        };
    }),
    printReaction: query([Reaction], Reaction, (reaction) => {
        console.log(typeof reaction);
        return reaction;
    })
});
```

Candid:

```
type Emotion = variant { Sad; Indifferent; Happy };
type Reaction = variant { Emotion : Emotion; Fire; ThumbsUp };
service : () -> {
    getReaction : () -> (Reaction) query;
    printReaction : (Reaction) -> (Reaction) query;
}
```

dfx:

```bash
dfx canister call candid_canister printReaction '(variant { Fire })'
(variant { Fire })
```
