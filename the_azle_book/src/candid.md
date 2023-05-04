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
    Query,
    Record
} from 'azle';

type Candid = Record<{
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
    record: Record<{
        firstName: string;
        lastName: string;
        age: nat8;
    }>;
    variant: Variant<{
        Tag1: null;
        Tag2: null;
        Tag3: int;
    }>;
    func: Func<Query<() => Candid>>;
    principal: Principal;
}>;

$query;
export function candidTypes(): Candid {
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
        opt: Opt.None,
        record: {
            firstName: 'John',
            lastName: 'Doe',
            age: 35
        },
        variant: {
            Tag1: null
        },
        func: [
            Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
            'candidTypes'
        ],
        principal: Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
    };
}
```

Calling `candidTypes` with `dfx` will return:

```
(
  record {
    "int" = 170_141_183_460_469_231_731_687_303_715_884_105_727 : int;
    "nat" = 340_282_366_920_938_463_463_374_607_431_768_211_455 : nat;
    "opt" = null;
    "principal" = principal "ryjl3-tyaaa-aaaaa-aaaba-cai";
    "blob" = vec {};
    "bool" = true;
    "func" = func "rrkah-fqaaa-aaaaa-aaaaq-cai".candidTypes;
    "int8" = 127 : int8;
    "nat8" = 255 : nat8;
    "text" = "text";
    "nat16" = 65_535 : nat16;
    "nat32" = 4_294_967_295 : nat32;
    "nat64" = 18_446_744_073_709_551_615 : nat64;
    "int16" = 32_767 : int16;
    "int32" = 2_147_483_647 : int32;
    "int64" = 9_223_372_036_854_775_807 : int64;
    "variant" = variant { Tag1 };
    "float32" = 0 : float32;
    "float64" = 0 : float64;
    "record" = record {
      age = 35 : nat8;
      firstName = "John";
      lastName = "Doe";
    };
  },
)
```

### text

The TypeScript type `string` corresponds to the [Candid type text](https://internetcomputer.org/docs/current/references/candid-ref#type-text) and will become a [JavaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) at runtime.

TypeScript:

```typescript
import { $query } from 'azle';

$query;
export function getString(): string {
    return 'Hello world!';
}

$query;
export function printString(string: string): string {
    console.log(typeof string);
    return string;
}
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

### blob

The Azle type `blob` corresponds to the [Candid type blob](https://internetcomputer.org/docs/current/references/candid-ref#type-blob) and will become a [JavaScript Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) at runtime.

TypeScript:

```typescript
import { blob, $query } from 'azle';

$query;
export function getBlob(): blob {
    return Uint8Array.from([68, 73, 68, 76, 0, 0]);
}

$query;
export function printBlob(blob: blob): blob {
    console.log(typeof blob);
    return blob;
}
```

Candid:

```
service : () -> {
    getBlob : () -> (vec nat8) query;
    printBlob : (vec nat8) -> (vec nat8) query;
}
```

dfx:

```bash
dfx canister call candid_canister printBlob '(vec { 68; 73; 68; 76; 0; 0; })'
(blob "DIDL\00\00")

dfx canister call candid_canister printBlob '(blob "DIDL\00\00")'
(blob "DIDL\00\00")
```

### nat

The Azle type `nat` corresponds to the [Candid type nat](https://internetcomputer.org/docs/current/references/candid-ref#type-nat) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { nat, $query } from 'azle';

$query;
export function getNat(): nat {
    return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
}

$query;
export function printNat(nat: nat): nat {
    console.log(typeof nat);
    return nat;
}
```

Candid:

```
service : () -> {
    getNat : () -> (nat) query;
    printNat : (nat) -> (nat) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat '(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)'
(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)
```

### nat64

The Azle type `nat64` corresponds to the [Candid type nat64](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { nat64, $query } from 'azle';

$query;
export function getNat64(): nat64 {
    return 18_446_744_073_709_551_615n;
}

$query;
export function printNat64(nat64: nat64): nat64 {
    console.log(typeof nat64);
    return nat64;
}
```

Candid:

```
service : () -> {
    getNat64 : () -> (nat64) query;
    printNat64 : (nat64) -> (nat64) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat64 '(18_446_744_073_709_551_615 : nat64)'
(18_446_744_073_709_551_615 : nat64)
```

### nat32

The Azle type `nat32` corresponds to the [Candid type nat32](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat32, $query } from 'azle';

$query;
export function getNat32(): nat32 {
    return 4_294_967_295;
}

$query;
export function printNat32(nat32: nat32): nat32 {
    console.log(typeof nat32);
    return nat32;
}
```

Candid:

```
service : () -> {
    getNat32 : () -> (nat32) query;
    printNat32 : (nat32) -> (nat32) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat32 '(4_294_967_295 : nat32)'
(4_294_967_295 : nat32)
```

### nat16

The Azle type `nat16` corresponds to the [Candid type nat16](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat16, $query } from 'azle';

$query;
export function getNat16(): nat16 {
    return 65_535;
}

$query;
export function printNat16(nat16: nat16): nat16 {
    console.log(typeof nat16);
    return nat16;
}
```

Candid:

```
service : () -> {
    getNat16 : () -> (nat16) query;
    printNat16 : (nat16) -> (nat16) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat16 '(65_535 : nat16)'
(65_535 : nat16)
```

### nat8

The Azle type `nat8` corresponds to the [Candid type nat8](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat8, $query } from 'azle';

$query;
export function getNat8(): nat8 {
    return 255;
}

$query;
export function printNat8(nat8: nat8): nat8 {
    console.log(typeof nat8);
    return nat8;
}
```

Candid:

```
service : () -> {
    getNat8 : () -> (nat8) query;
    printNat8 : (nat8) -> (nat8) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNat8 '(255 : nat8)'
(255 : nat8)
```

### int

The Azle type `int` corresponds to the [Candid type int](https://internetcomputer.org/docs/current/references/candid-ref#type-int) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int, $query } from 'azle';

$query;
export function getInt(): int {
    return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
}

$query;
export function printInt(int: int): int {
    console.log(typeof int);
    return int;
}
```

Candid:

```
service : () -> {
    getInt : () -> (int) query;
    printInt : (int) -> (int) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt '(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)'
(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)
```

### int64

The Azle type `int64` corresponds to the [Candid type int64](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int64, $query } from 'azle';

$query;
export function getInt64(): int64 {
    return 9_223_372_036_854_775_807n;
}

$query;
export function printInt64(int64: int64): int64 {
    console.log(typeof int64);
    return int64;
}
```

Candid:

```
service : () -> {
    getInt64 : () -> (int64) query;
    printInt64 : (int64) -> (int64) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt64 '(9_223_372_036_854_775_807 : int64)'
(9_223_372_036_854_775_807 : int64)
```

### int32

The Azle type `int32` corresponds to the [Candid type int32](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int32, $query } from 'azle';

$query;
export function getInt32(): int32 {
    return 2_147_483_647;
}

$query;
export function printInt32(int32: int32): int32 {
    console.log(typeof int32);
    return int32;
}
```

Candid:

```
service : () -> {
    getInt32 : () -> (int32) query;
    printInt32 : (int32) -> (int32) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt32 '(2_147_483_647 : int32)'
(2_147_483_647 : int32)
```

### int16

The Azle type `int16` corresponds to the [Candid type int16](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int16, $query } from 'azle';

$query;
export function getInt16(): int16 {
    return 32_767;
}

$query;
export function printInt16(int16: int16): int16 {
    console.log(typeof int16);
    return int16;
}
```

Candid:

```
service : () -> {
    getInt16 : () -> (int16) query;
    printInt16 : (int16) -> (int16) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt16 '(32_767 : int16)'
(32_767 : int16)
```

### int8

The Azle type `int8` corresponds to the [Candid type int8](https://internetcomputer.org/docs/current/references/candid-ref#type-natn-and-intn) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int8, $query } from 'azle';

$query;
export function getInt8(): int8 {
    return 127;
}

$query;
export function printInt8(int8: int8): int8 {
    console.log(typeof int8);
    return int8;
}
```

Candid:

```
service : () -> {
    getInt8 : () -> (int8) query;
    printInt8 : (int8) -> (int8) query;
}
```

dfx:

```bash
dfx canister call candid_canister printInt8 '(127 : int8)'
(127 : int8)
```

### float64

The Azle type `float64` corresponds to the [Candid type float64](https://internetcomputer.org/docs/current/references/candid-ref#type-float32-and-float64) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float64, $query } from 'azle';

$query;
export function getFloat64(): float64 {
    return Math.E;
}

$query;
export function printFloat64(float64: float64): float64 {
    console.log(typeof float64);
    return float64;
}
```

Candid:

```
service : () -> {
    getFloat64 : () -> (float64) query;
    printFloat64 : (float64) -> (float64) query;
}
```

dfx:

```bash
dfx canister call candid_canister printFloat64 '(2.718281828459045 : float64)'
(2.718281828459045 : float64)
```

### float32

The Azle type `float32` corresponds to the [Candid type float32](https://internetcomputer.org/docs/current/references/candid-ref#type-float32-and-float64) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float32, $query } from 'azle';

$query;
export function getFloat32(): float32 {
    return Math.PI;
}

$query;
export function printFloat32(float32: float32): float32 {
    console.log(typeof float32);
    return float32;
}
```

Candid:

```
service : () -> {
    getFloat32 : () -> (float32) query;
    printFloat32 : (float32) -> (float32) query;
}
```

dfx:

```bash
dfx canister call candid_canister printFloat32 '(3.1415927 : float32)'
(3.1415927 : float32)
```

### bool

The TypeScript type `boolean` corresponds to the [Candid type bool](https://internetcomputer.org/docs/current/references/candid-ref#type-bool) and will become a [JavaScript Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) at runtime.

TypeScript:

```typescript
import { $query } from 'azle';

$query;
export function getBool(): boolean {
    return true;
}

$query;
export function printBool(bool: boolean): boolean {
    console.log(typeof bool);
    return bool;
}
```

Candid:

```
service : () -> {
    getBool : () -> (bool) query;
    printBool : (bool) -> (bool) query;
}
```

dfx:

```bash
dfx canister call candid_canister printBool '(true)'
(true)
```

### null

The TypeScript type `null` corresponds to the [Candid type null](https://internetcomputer.org/docs/current/references/candid-ref#type-null) and will become a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript:

```typescript
import { $query } from 'azle';

$query;
export function getNull(): null {
    return null;
}

$query;
export function printNull(null_: null): null {
    console.log(typeof null_);
    return null_;
}
```

Candid:

```
service : () -> {
    getNull : () -> (null) query;
    printNull : (null) -> (null) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNull '(null)'
(null : null)
```

### vec

TypeScript `[]` array syntax corresponds to the [Candid type vec](https://internetcomputer.org/docs/current/references/candid-ref#type-vec-t) and will become a [JavaScript array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of the specified type at runtime (except for `nat8[]` which will become a `Uint8Array`, thus it is recommended to use the `blob` type instead of `nat8[]`). Only the `[]` array syntax is supported at this time (i.e. not `Array` or `ReadonlyArray` etc).

TypeScript:

```typescript
import { int32, $query } from 'azle';

$query;
export function getNumbers(): int32[] {
    return [0, 1, 2, 3];
}

$query;
export function printNumbers(numbers: int32[]): int32[] {
    console.log(typeof numbers);
    return numbers;
}
```

Candid:

```
service : () -> {
    getNumbers : () -> (vec int32) query;
    printNumbers : (vec int32) -> (vec int32) query;
}
```

dfx:

```bash
dfx canister call candid_canister printNumbers '(vec { 0 : int32; 1 : int32; 2 : int32; 3 : int32 })'
(vec { 0 : int32; 1 : int32; 2 : int32; 3 : int32 })
```

### opt

The Azle type `Opt` corresponds to the [Candid type opt](https://internetcomputer.org/docs/current/references/candid-ref#type-opt-t) and will become the enclosed JavaScript type or null at runtime.

TypeScript:

```typescript
import { Opt, $query } from 'azle';

$query;
export function getOptSome(): Opt<boolean> {
    return Opt.Some(true);
}

$query;
export function getOptNone(): Opt<boolean> {
    return Opt.None;
}
```

Candid:

```
service : () -> {
    getOptNone : () -> (opt bool) query;
    getOptSome : () -> (opt bool) query;
}
```

dfx:

```bash
dfx canister call candid_canister getOptSome
(opt true)

dfx canister call candid_canister getOptNone
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
export function getUser(): User {
    return {
        id: Principal.fromUint8Array(Uint8Array.from([0])),
        username: 'lastmjs'
    };
}

$query;
export function printUser(user: User): User {
    console.log(typeof user);
    return user;
}
```

Candid:

```
type User = record { id : principal; username : text };
service : () -> {
    getUser : () -> (User) query;
    printUser : (User) -> (User) query;
}
```

dfx:

```bash
dfx canister call candid_canister printUser '(record { id = principal "2ibo7-dia"; username = "lastmjs" })'
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

### func

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
export function printBasicFunc(basicFunc: BasicFunc): BasicFunc {
    console.log(typeof basicFunc);
    return basicFunc;
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

### service

[Not yet implemented.](https://github.com/demergent-labs/azle/issues/445)

### principal

The Azle type `Principal` corresponds to the [Candid type principal](https://internetcomputer.org/docs/current/references/candid-ref#type-principal) and will become an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) at runtime.

TypeScript:

```typescript
import { Principal, $query } from 'azle';

$query;
export function getPrincipal(): Principal {
    return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
}

$query;
export function printPrincipal(principal: Principal): Principal {
    console.log(typeof principal);
    return principal;
}
```

Candid:

```
service : () -> {
    getPrincipal : () -> (principal) query;
    printPrincipal : (principal) -> (principal) query;
}
```

dfx:

```bash
dfx canister call candid_canister printPrincipal '(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'
(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")
```

### reserved

The Azle type `reserved` corresponds to the [Candid type reserved](https://internetcomputer.org/docs/current/references/candid-ref#type-reserved), is the TypeScript type `any`, and will become a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript:

```typescript
import { $query, reserved } from 'azle';

$query;
export function getReserved(): reserved {
    return 'anything';
}

$query;
export function printReserved(reserved: reserved): reserved {
    console.log(typeof reserved);
    return reserved;
}
```

Candid:

```
service : () -> {
    getReserved : () -> (reserved) query;
    printReserved : (reserved) -> (reserved) query;
}
```

dfx:

```bash
dfx canister call candid_canister printReserved '(null)'
(null : reserved)
```

### empty

The Azle type `empty` corresponds to the [Candid type empty](https://internetcomputer.org/docs/current/references/candid-ref#type-empty) and has no JavaScript value at runtime.

TypeScript:

```typescript
import { empty, $query } from 'azle';

$query;
export function getEmpty(): empty {
    throw 'Anything you want';
}

// Note: It is impossible to call this function because it requires an argument
// but there is no way to pass an "empty" value as an argument.
$query;
export function printEmpty(empty: empty): empty {
    console.log(typeof empty);
    throw 'Anything you want';
}
```

Candid:

```
service : () -> {
    getEmpty : () -> (empty) query;
    printEmpty : (empty) -> (empty) query;
}
```

dfx:

```bash
dfx canister call candid_canister printEmpty '("You can put anything here")'
Error: Failed to create argument blob.
Caused by: Failed to create argument blob.
  Invalid data: Unable to serialize Candid values: type mismatch: "You can put anything here" cannot be of type empty
```
