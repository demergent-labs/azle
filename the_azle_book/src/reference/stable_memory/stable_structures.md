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
    InsertError,
    nat64,
    nat8,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';

type Key = nat8;
type Value = string;

type InsertResult = Variant<{
    ok: Opt<Value>;
    err: InsertError;
}>;

let map = new StableBTreeMap<Key, Value>(0, 100, 1_000);

$query;
export function contains_key(key: Key): boolean {
    return map.contains_key(key);
}

$query;
export function get(key: Key): Opt<Value> {
    return map.get(key);
}

$update;
export function insert(key: Key, value: Value): InsertResult {
    return map.insert(key, value);
}

$query;
export function is_empty(): boolean {
    return map.is_empty();
}

$query;
export function items(): [Key, Value][] {
    return map.items();
}

$query;
export function keys(): Key[] {
    return map.keys();
}

$query;
export function len(): nat64 {
    return map.len();
}

$update;
export function remove(key: Key): Opt<Value> {
    return map.remove(key);
}

$query;
export function values(): Value[] {
    return map.values();
}
```
