# variant

This section is a work in progress.

TypeScript type aliases referring to object literals wrapped in the `Variant` Azle type correspond to the [Candid variant type](https://internetcomputer.org/docs/current/references/candid-ref#type-variant--n--t--) and will become [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

TypeScript:

```typescript
import { $query, Variant } from 'azle';

type Reaction = Variant<{
    Fire: null;
    ThumbsUp: null;
    Emotion: Emotion;
}>;

type Emotion = Variant<{
    Happy: null;
    Indifferent: null;
    Sad: null;
}>;

$query;
export function getReaction(): Reaction {
    return {
        Fire: null
    };
}

$query;
export function printReaction(reaction: Reaction): Reaction {
    console.log(typeof reaction);
    return reaction;
}
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
