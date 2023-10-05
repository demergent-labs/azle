# stable structures

This section is a work in progress.

Examples:

-   [audio_recorder](https://github.com/demergent-labs/azle/tree/main/examples/audio_recorder)
-   [ethereum_json_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ethereum_json_rpc)
-   [func_types](https://github.com/demergent-labs/azle/tree/main/examples/func_types)
-   [http_counter](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/http_counter)
-   [inline_types](https://github.com/demergent-labs/azle/tree/main/examples/inline_types)
-   [persistent-storage](https://github.com/demergent-labs/azle/tree/main/examples/motoko_examples/persistent-storage)
-   [pre_and_post_upgrade](https://github.com/demergent-labs/azle/tree/main/examples/pre_and_post_upgrade)
-   [stable_structures](https://github.com/demergent-labs/azle/tree/main/examples/stable_structures)

```typescript
import {
    bool,
    Canister,
    nat64,
    nat8,
    Opt,
    query,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec
} from 'azle';

const Key = nat8;
const Value = text;

let map = StableBTreeMap(Key, Value, 0);

export default Canister({
    containsKey: query([Key], bool, (key) => {
        return map.containsKey(key);
    }),
    get: query([Key], Opt(Value), (key) => {
        return map.get(key);
    }),
    mapInsert: update([Key, Value], Opt(Value), (key, value) => {
        return map.insert(key, value);
    }),
    isEmpty: query([], bool, () => {
        return map.isEmpty();
    }),
    items: query([], Vec(Tuple(Key, Value)), () => {
        return map.items();
    }),
    keys: query([], Vec(Key), () => {
        return map.keys();
    }),
    len: query([], nat64, () => {
        return map.len();
    }),
    mapRemove: update([Key], Opt(Value), (key) => {
        return map.remove(key);
    }),
    values: query([], Vec(Value), () => {
        return map.values();
    })
});
```
