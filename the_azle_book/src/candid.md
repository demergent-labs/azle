# Candid

-   [text](#text)
-   [blob](#blob)
-   [nat](#nat)
-   [nat64](#nat64)
-   [nat32](#nat32)
-   [nat16](#nat16)
-   [nat8](#nat8)
-   [int](#int)
-   [int64](#int64)
-   [int32](#int32)
-   [int16](#int16)
-   [int8](#int8)
-   [float64](#float64)
-   [float32](#float32)
-   [bool](#bool)
-   [null](#null)
-   [vec](#vec)
-   [opt](#opt)
-   [record](#record)
-   [variant](#variant)
-   [func](#func)
-   [service](#service)
-   [principal](#principal)
-   [reserved](#reserved)
-   [empty](#empty)

[Candid](https://internetcomputer.org/docs/current/developer-docs/backend/candid/) is an interface description language created by [DFINITY](https://dfinity.org/). It can be used to define interfaces between services (canisters), allowing canisters and clients written in various languages to easily interact with each other.

Azle allows you to express Candid types through a combination of native and Azle-provided TypeScript types. These types will be necessary in various places as you define your canister. For example, Candid types must be used when defining the parameters and return types of your query and update methods.

It's important to note that the Candid types are represented at runtime using specific JavaScript data structures that may differ in behavior from the description of the actual Candid type. For example, a `float32` Candid type is a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), a `nat64` is a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), and an `int` is also a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

Keep this in mind as it may result in unexpected behavior. Each Candid type and its equivalent JavaScript runtime value is explained in more detail in this chapter.

A reference of all Candid types available on the Internet Computer (IC) can be found [here](https://internetcomputer.org/docs/current/references/candid-ref).

The following is a simple example showing how to import and use most of the Candid types available in Azle:

```typescript
import {
    blob,
    nat,
    nat64,
    nat32,
    nat16,
    nat8,
    int,
    int64,
    int32,
    int16,
    int8,
    float64,
    float32,
    Opt,
    Variant,
    Func,
    Principal,
    $query,
    Query
} from 'azle';

type Candid = {
    text: string;
    blob: blob;
    nat: nat;
    nat64: nat64;
    nat32: nat32;
    nat16: nat16;
    nat8: nat8;
    int: int;
    int64: int64;
    int32: int32;
    int16: int16;
    int8: int8;
    float64: float64;
    float32: float32;
    bool: boolean;
    opt: Opt<nat>;
    record: {
        first_name: string;
        last_name: string;
        age: nat8;
    };
    variant: Variant<{
        Tag1: null;
        Tag2: null;
        Tag3: int;
    }>;
    func: Func<() => Candid>;
    principal: Principal;
};

$query;
export function candid_types(): Candid {
    return {
        text: 'text',
        blob: Uint8Array.from([]),
        nat: 340_282_366_920_938_463_463_374_607_431_768_211_455n,
        nat64: 18_446_744_073_709_551_615n,
        nat32: 4_294_967_295,
        nat16: 65_535,
        nat8: 255,
        int: 170_141_183_460_469_231_731_687_303_715_884_105_727n,
        int64: 9_223_372_036_854_775_807n,
        int32: 2_147_483_647,
        int16: 32_767,
        int8: 127,
        float64: Math.E,
        float32: Math.PI,
        bool: true,
        opt: null,
        record: {
            first_name: 'John',
            last_name: 'Doe',
            age: 35
        },
        variant: {
            Tag1: null
        },
        func: [
            Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
            'candid_types'
        ],
        principal: Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
    };
}
```

Calling `candid_types` with `dfx` will return:

```
(
  record {
    "int" = 170_141_183_460_469_231_731_687_303_715_884_105_727 : int;
    "nat" = 340_282_366_920_938_463_463_374_607_431_768_211_455 : nat;
    "opt" = null;
    "principal" = principal "ryjl3-tyaaa-aaaaa-aaaba-cai";
    "blob" = vec {};
    "func" = func "rrkah-fqaaa-aaaaa-aaaaq-cai".candid_types;
    "int8" = 127 : int8;
    "nat8" = 255 : nat8;
    "nat16" = 65_535 : nat16;
    "nat32" = 4_294_967_295 : nat32;
    "nat64" = 18_446_744_073_709_551_615 : nat64;
    "int16" = 32_767 : int16;
    "int32" = 2_147_483_647 : int32;
    "int64" = 9_223_372_036_854_775_807 : int64;
    "variant" = variant { Tag1 };
    "float32" = 3.1415927 : float32;
    "float64" = 2.718281828459045 : float64;
  },
)
```

### text

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

### blob

The Azle type `blob` corresponds to the [Candid type blob](https://internetcomputer.org/docs/current/references/candid-ref#type-blob) and will become a [JavaScript Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) at runtime.

TypeScript:

```typescript
import { blob, $query } from 'azle';

$query;
export function get_blob(): blob {
    return Uint8Array.from([68, 73, 68, 76, 0, 0]);
}

$query;
export function print_blob(blob: blob): blob {
    console.log(typeof blob);
    return blob;
}
```

Candid:

```
service : () -> {
    get_blob : () -> (vec nat8) query;
    print_blob : (vec nat8) -> (vec nat8) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_blob '(vec { 68; 73; 68; 76; 0; 0; })'
(blob "DIDL\00\00")

dfx canister call candid_canister print_blob '(blob "DIDL\00\00")'
(blob "DIDL\00\00")
```

### nat

The Azle type `nat` corresponds to the [Candid type nat](https://internetcomputer.org/docs/current/references/candid-ref#type-nat) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { nat, $query } from 'azle';

$query;
export function get_nat(): nat {
    return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
}

$query;
export function print_nat(nat: nat): nat {
    console.log(typeof nat);
    return nat;
}
```

Candid:

```
service : () -> {
    get_nat : () -> (nat) query;
    print_nat : (nat) -> (nat) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_nat '(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)'
(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)
```

### nat64

The Azle type `nat64` corresponds to the [Candid type nat64](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { nat64, $query } from 'azle';

$query;
export function get_nat64(): nat64 {
    return 18_446_744_073_709_551_615n;
}

$query;
export function print_nat64(nat64: nat64): nat64 {
    console.log(typeof nat64);
    return nat64;
}
```

Candid:

```
service : () -> {
    get_nat64 : () -> (nat64) query;
    print_nat64 : (nat64) -> (nat64) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_nat64 '(18_446_744_073_709_551_615 : nat64)'
(18_446_744_073_709_551_615 : nat64)
```

### nat32

The Azle type `nat32` corresponds to the [Candid type nat32](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat32, $query } from 'azle';

$query;
export function get_nat32(): nat32 {
    return 4_294_967_295;
}

$query;
export function print_nat32(nat32: nat32): nat32 {
    console.log(typeof nat32);
    return nat32;
}
```

Candid:

```
service : () -> {
    get_nat32 : () -> (nat32) query;
    print_nat32 : (nat32) -> (nat32) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_nat32 '(4_294_967_295 : nat32)'
(4_294_967_295 : nat32)
```

### nat16

The Azle type `nat16` corresponds to the [Candid type nat16](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat16, $query } from 'azle';

$query;
export function get_nat16(): nat16 {
    return 65_535;
}

$query;
export function print_nat16(nat16: nat16): nat16 {
    console.log(typeof nat16);
    return nat16;
}
```

Candid:

```
service : () -> {
    get_nat16 : () -> (nat16) query;
    print_nat16 : (nat16) -> (nat16) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_nat16 '(65_535 : nat16)'
(65_535 : nat16)
```

### nat8

The Azle type `nat8` corresponds to the [Candid type nat8](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat8, $query } from 'azle';

$query;
export function get_nat8(): nat8 {
    return 255;
}

$query;
export function print_nat8(nat8: nat8): nat8 {
    console.log(typeof nat8);
    return nat8;
}
```

Candid:

```
service : () -> {
    get_nat8 : () -> (nat8) query;
    print_nat8 : (nat8) -> (nat8) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_nat8 '(255 : nat8)'
(255 : nat8)
```

### int

The Azle type `int` corresponds to the [Candid type int](https://internetcomputer.org/docs/current/references/candid-ref#type-int) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int, $query } from 'azle';

$query;
export function get_int(): int {
    return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
}

$query;
export function print_int(int: int): int {
    console.log(typeof int);
    return int;
}
```

Candid:

```
service : () -> {
    get_int : () -> (int) query;
    print_int : (int) -> (int) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_int '(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)'
(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)
```

### int64

The Azle type `int64` corresponds to the [Candid type int64](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int64, $query } from 'azle';

$query;
export function get_int64(): int64 {
    return 9_223_372_036_854_775_807n;
}

$query;
export function print_int64(int64: int64): int64 {
    console.log(typeof int64);
    return int64;
}
```

Candid:

```
service : () -> {
    get_int64 : () -> (int64) query;
    print_int64 : (int64) -> (int64) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_int64 '(9_223_372_036_854_775_807 : int64)'
(9_223_372_036_854_775_807 : int64)
```

### int32

The Azle type `int32` corresponds to the [Candid type int32](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int32, $query } from 'azle';

$query;
export function get_int32(): int32 {
    return 2_147_483_647;
}

$query;
export function print_int32(int32: int32): int32 {
    console.log(typeof int32);
    return int32;
}
```

Candid:

```
service : () -> {
    get_int32 : () -> (int32) query;
    print_int32 : (int32) -> (int32) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_int32 '(2_147_483_647 : int32)'
(2_147_483_647 : int32)
```

### int16

The Azle type `int16` corresponds to the [Candid type int16](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int16, $query } from 'azle';

$query;
export function get_int16(): int16 {
    return 32_767;
}

$query;
export function print_int16(int16: int16): int16 {
    console.log(typeof int16);
    return int16;
}
```

Candid:

```
service : () -> {
    get_int16 : () -> (int16) query;
    print_int16 : (int16) -> (int16) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_int16 '(32_767 : int16)'
(32_767 : int16)
```

### int8

The Azle type `int8` corresponds to the [Candid type int8](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int8, $query } from 'azle';

$query;
export function get_int8(): int8 {
    return 127;
}

$query;
export function print_int8(int8: int8): int8 {
    console.log(typeof int8);
    return int8;
}
```

Candid:

```
service : () -> {
    get_int8 : () -> (int8) query;
    print_int8 : (int8) -> (int8) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_int8 '(127 : int8)'
(127 : int8)
```

### float64

The Azle type `float64` corresponds to the [Candid type float64](https://internetcomputer.org/docs/current/references/candid-ref#type-float32-and-float64) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float64, $query } from 'azle';

$query;
export function get_float64(): float64 {
    return Math.E;
}

$query;
export function print_float64(float64: float64): float64 {
    console.log(typeof float64);
    return float64;
}
```

Candid:

```
service : () -> {
    get_float64 : () -> (float64) query;
    print_float64 : (float64) -> (float64) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_float64 '(2.718281828459045 : float64)'
(2.718281828459045 : float64)
```

### float32

The Azle type `float32` corresponds to the [Candid type float32](https://internetcomputer.org/docs/current/references/candid-ref#type-float32-and-float64) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float32, $query } from 'azle';

$query;
export function get_float32(): float32 {
    return Math.PI;
}

$query;
export function print_float32(float32: float32): float32 {
    console.log(typeof float32);
    return float32;
}
```

Candid:

```
service : () -> {
    get_float32 : () -> (float32) query;
    print_float32 : (float32) -> (float32) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_float32 '(3.1415927 : float32)'
(3.1415927 : float32)
```

### bool

The TypeScript type `boolean` corresponds to the [Candid type bool](https://internetcomputer.org/docs/current/references/candid-ref#type-bool) and will become a [JavaScript Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) at runtime.

TypeScript:

```typescript
import { $query } from 'azle';

$query;
export function get_bool(): boolean {
    return true;
}

$query;
export function print_bool(bool: boolean): boolean {
    console.log(typeof bool);
    return bool;
}
```

Candid:

```
service : () -> {
    get_bool : () -> (bool) query;
    print_bool : (bool) -> (bool) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_bool '(true)'
(true)
```

### null

The TypeScript type `null` corresponds to the [Candid type null](https://internetcomputer.org/docs/current/references/candid-ref#type-null) and will become a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript:

```typescript
import { $query } from 'azle';

$query;
export function get_null(): null {
    return null;
}

$query;
export function print_null(null_: null): null {
    console.log(typeof null_);
    return null_;
}
```

Candid:

```
service : () -> {
    get_null : () -> (null) query;
    print_null : (null) -> (null) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_null '(null)'
(null : null)
```

### vec

TypeScript `[]` array syntax corresponds to the [Candid type vec](https://internetcomputer.org/docs/current/references/candid-ref#type-vec-t) and will become a [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of the specified type at runtime (except for `nat8[]` which will become a `Uint8Array`, thus it is recommended to use the `blob` type instead of `nat8[]`). Only the `[]` array syntax is supported at this time (i.e. not `Array` or `ReadonlyArray` etc).

TypeScript:

```typescript
import { int32, $query } from 'azle';

$query;
export function get_numbers(): int32[] {
    return [0, 1, 2, 3];
}

$query;
export function print_numbers(numbers: int32[]): int32[] {
    console.log(typeof numbers);
    return numbers;
}
```

Candid:

```
service : () -> {
    get_numbers : () -> (vec int32) query;
    print_numbers : (vec int32) -> (vec int32) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_numbers '(vec { 0 : int32; 1 : int32; 2 : int32; 3 : int32 })'
(vec { 0 : int32; 1 : int32; 2 : int32; 3 : int32 })
```

### opt

The Azle type `Opt` corresponds to the [Candid type opt](https://internetcomputer.org/docs/current/references/candid-ref#type-opt-t) and will become the enclosed JavaScript type or null at runtime.

TypeScript:

```typescript
import { Opt, $query } from 'azle';

$query;
export function get_opt_some(): Opt<boolean> {
    return true;
}

$query;
export function get_opt_none(): Opt<boolean> {
    return null;
}
```

Candid:

```
service : () -> {
    get_opt_none : () -> (opt bool) query;
    get_opt_some : () -> (opt bool) query;
}
```

dfx:

```bash
dfx canister call candid_canister get_opt_some
(opt true)

dfx canister call candid_canister get_opt_none
(null)
```

### record

TypeScript type aliases referring to object literals wrapped in the `Record` Azle type correspond to the [Candid record type](https://internetcomputer.org/docs/current/references/candid-ref#type-record--n--t--) and will become [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

TypeScript:

```typescript
import { Principal, $query, Record } from 'azle';

type User = Record<{
    id: Principal;
    username: string;
}>;

$query;
export function get_user(): User {
    return {
        id: Principal.fromUint8Array(Uint8Array.from([0])),
        username: 'lastmjs'
    };
}

$query;
export function print_user(user: User): User {
    console.log(typeof user);
    return user;
}
```

Candid:

```
type User = record { id : principal; username : text };
service : () -> {
    get_user : () -> (User) query;
    print_user : (User) -> (User) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_user '(record { id = principal "2ibo7-dia"; username = "lastmjs" })'
(record { id = principal "2ibo7-dia"; username = "lastmjs" })
```

### variant

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
export function get_reaction(): Reaction {
    return {
        Fire: null
    };
}

$query;
export function print_reaction(reaction: Reaction): Reaction {
    console.log(typeof reaction);
    return reaction;
}
```

Candid:

```
type Emotion = variant { Sad; Indifferent; Happy };
type Reaction = variant { Emotion : Emotion; Fire; ThumbsUp };
service : () -> {
    get_reaction : () -> (Reaction) query;
    print_reaction : (Reaction) -> (Reaction) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_reaction '(variant { Fire })'
(variant { Fire })
```

### func

The Azle type `func` corresponds to the [Candid type func](https://internetcomputer.org/docs/current/references/candid-ref#type-func---) and will become a [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) with two elements at runtime.

The first element is an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) and the second is a [JavaScript string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). The `@dfinity/principal` represents the `principal` of the canister/service where the function exists, and the `string` represents the function's name.

A `func` acts as a callback, allowing the `func` receiver to know which canister instance and method must be used to call back.

TypeScript:

```typescript
import { Func, Principal, $query, Query } from 'azle';

type BasicFunc = Func<Query<(param1: string) => string>>;

$query;
export function get_basic_func(): BasicFunc {
    return [
        Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
        'get_basic_func'
    ];
}

$query;
export function print_basic_func(basic_func: BasicFunc): BasicFunc {
    console.log(typeof basic_func);
    return basic_func;
}
```

Candid:

```
service : () -> {
    get_basic_func : () -> (func (text) -> (text) query) query;
    print_basic_func : (func (text) -> (text) query) -> (
        func (text) -> (text) query,
      ) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_basic_func '(func "r7inp-6aaaa-aaaaa-aaabq-cai".get_basic_func)'
(func "r7inp-6aaaa-aaaaa-aaabq-cai".get_basic_func)
```

### service

[Not yet implemented.](https://github.com/demergent-labs/azle/issues/445)

### principal

The Azle type `Principal` corresponds to the [Candid type principal](https://internetcomputer.org/docs/current/references/candid-ref#type-principal) and will become an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) at runtime.

TypeScript:

```typescript
import { Principal, $query } from 'azle';

$query;
export function get_principal(): Principal {
    return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
}

$query;
export function print_principal(principal: Principal): Principal {
    console.log(typeof principal);
    return principal;
}
```

Candid:

```
service : () -> {
    get_principal : () -> (principal) query;
    print_principal : (principal) -> (principal) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_principal '(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'
(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")
```

### reserved

The Azle type `reserved` corresponds to the [Candid type reserved](https://internetcomputer.org/docs/current/references/candid-ref#type-reserved), is the TypeScript type `any`, and will become a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript:

```typescript
import { $query, reserved } from 'azle';

$query;
export function get_reserved(): reserved {
    return 'anything';
}

$query;
export function print_reserved(reserved: reserved): reserved {
    console.log(typeof reserved);
    return reserved;
}
```

Candid:

```
service : () -> {
    get_reserved : () -> (reserved) query;
    print_reserved : (reserved) -> (reserved) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_reserved '(null)'
(null : reserved)
```

### empty

The Azle type `empty` corresponds to the [Candid type empty](https://internetcomputer.org/docs/current/references/candid-ref#type-empty) and has no JavaScript value at runtime.

TypeScript:

```typescript
import { empty, $query } from 'azle';

$query;
export function get_empty(): empty {
    throw 'Anything you want';
}

// Note: It is impossible to call this function because it requires an argument
// but there is no way to pass an "empty" value as an argument.
$query;
export function print_empty(empty: empty): empty {
    console.log(typeof empty);
    throw 'Anything you want';
}
```

Candid:

```
service : () -> {
    get_empty : () -> (empty) query;
    print_empty : (empty) -> (empty) query;
}
```

dfx:

```bash
dfx canister call candid_canister print_empty '("You can put anything here")'
Error: Failed to create argument blob.
Caused by: Failed to create argument blob.
  Invalid data: Unable to serialize Candid values: type mismatch: "You can put anything here" cannot be of type empty
```
