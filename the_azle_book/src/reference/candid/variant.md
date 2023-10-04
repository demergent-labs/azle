# variant

TypeScript type aliases referring to object literals wrapped in the `Variant` Azle type correspond to the [Candid variant type](https://internetcomputer.org/docs/current/references/candid-ref#type-variant--n--t--) and will become [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

TypeScript:

```typescript
import { Canister, Null, Variant, query } from 'azle';

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
