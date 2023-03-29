import {
    empty,
    float64,
    float32,
    int,
    int64,
    int32,
    int16,
    int8,
    nat,
    nat64,
    nat32,
    nat16,
    nat8,
    Principal,
    $query,
    reserved,
    text
} from 'azle';

$query;
export function getString(): string {
    return 'string';
}

$query;
export function printString(string: string): string {
    console.log(typeof string);
    return string;
}

$query;
export function getText(): text {
    return 'text';
}

$query;
export function printText(text: text): text {
    console.log(typeof text);
    return text;
}

$query;
export function getNumber(): number {
    return Number.MAX_SAFE_INTEGER;
}

$query;
export function printNumber(number: number): number {
    console.log(typeof number);
    return number;
}

$query;
export function getInt(): int {
    return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
}

$query;
export function printInt(int: int): int {
    console.log(typeof int);
    return int;
}

$query;
export function getInt64(): int64 {
    return 9_223_372_036_854_775_807n;
}

$query;
export function printInt64(int64: int64): int64 {
    console.log(typeof int64);
    return int64;
}

$query;
export function getInt32(): int32 {
    return 2_147_483_647;
}

$query;
export function printInt32(int32: int32): int32 {
    console.log(typeof int32);
    return int32;
}

$query;
export function getInt16(): int16 {
    return 32_767;
}

$query;
export function printInt16(int16: int16): int16 {
    console.log(typeof int16);
    return int16;
}

$query;
export function getInt8(): int8 {
    return 127;
}

$query;
export function printInt8(int8: int8): int8 {
    console.log(typeof int8);
    return int8;
}

$query;
export function getNat(): nat {
    return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
}

$query;
export function printNat(nat: nat): nat {
    console.log(typeof nat);
    return nat;
}

$query;
export function getNat64(): nat64 {
    return 18_446_744_073_709_551_615n;
}

$query;
export function printNat64(nat64: nat64): nat64 {
    console.log(typeof nat64);
    return nat64;
}

$query;
export function getNat32(): nat32 {
    return 4_294_967_295;
}

$query;
export function printNat32(nat32: nat32): nat32 {
    console.log(typeof nat32);
    return nat32;
}

$query;
export function getNat16(): nat16 {
    return 65_535;
}

$query;
export function printNat16(nat16: nat16): nat16 {
    console.log(typeof nat16);
    return nat16;
}

$query;
export function getNat8(): nat8 {
    return 255;
}

$query;
export function printNat8(nat8: nat8): nat8 {
    console.log(typeof nat8);
    return nat8;
}

$query;
export function getFloat64(): float64 {
    return Math.E;
}

$query;
export function printFloat64(float64: float64): float64 {
    console.log(typeof float64);
    return float64;
}

$query;
export function getFloat32(): float32 {
    return Math.PI;
}

$query;
export function printFloat32(float32: float32): float32 {
    console.log(typeof float32);
    return float32;
}

$query;
export function getBool(): boolean {
    return true;
}

$query;
export function printBool(boolean: boolean): boolean {
    console.log(typeof boolean);
    return boolean;
}

$query;
export function getPrincipal(): Principal {
    return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
}

$query;
export function printPrincipal(principal: Principal): Principal {
    console.log(typeof principal);
    return principal;
}

$query;
export function getNull(): null {
    return null;
}

$query;
export function printNull(Null: null): null {
    console.log(typeof Null);
    return Null;
}

$query;
export function getReserved(): reserved {
    return 'anything';
}

$query;
export function printReserved(reserved: reserved): reserved {
    console.log(typeof reserved);
    return reserved;
}

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
