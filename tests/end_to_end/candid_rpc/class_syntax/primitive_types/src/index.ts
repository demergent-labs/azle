import {
    bool,
    empty,
    float32,
    float64,
    int,
    int8,
    int16,
    int32,
    int64,
    nat,
    nat8,
    nat16,
    nat32,
    nat64,
    Null,
    Principal,
    query,
    reserved,
    text
} from 'azle/experimental';

export default class {
    @query([], text)
    getString() {
        return 'string';
    }
    @query([text], text)
    printString(string) {
        console.log(typeof string);
        return string;
    }
    @query([], text)
    getText() {
        return 'text';
    }
    @query([text], text)
    printText(text) {
        console.log(typeof text);
        return text;
    }
    @query([], float64)
    getNumber() {
        return Number.MAX_SAFE_INTEGER;
    }
    @query([float64], float64)
    printNumber(number) {
        console.log(typeof number);
        return number;
    }
    @query([], int)
    getInt() {
        return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
    }
    @query([int], int)
    printInt(int) {
        console.log(typeof int);
        return int;
    }
    @query([], int64)
    getInt64() {
        return 9_223_372_036_854_775_807n;
    }
    @query([int64], int64)
    printInt64(int64) {
        console.log(typeof int64);
        return int64;
    }
    @query([], int32)
    getInt32() {
        return 2_147_483_647;
    }
    @query([int32], int32)
    printInt32(int32) {
        console.log(typeof int32);
        return int32;
    }
    @query([], int16)
    getInt16() {
        return 32_767;
    }
    @query([int16], int16)
    printInt16(int16) {
        console.log(typeof int16);
        return int16;
    }
    @query([], int8)
    getInt8() {
        return 127;
    }
    @query([int8], int8)
    printInt8(int8) {
        console.log(typeof int8);
        return int8;
    }
    @query([], nat)
    getNat() {
        return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
    }
    @query([nat], nat)
    printNat(nat) {
        console.log(typeof nat);
        return nat;
    }
    @query([], nat64)
    getNat64() {
        return 18_446_744_073_709_551_615n;
    }
    @query([nat64], nat64)
    printNat64(nat64) {
        console.log(typeof nat64);
        return nat64;
    }
    @query([], nat32)
    getNat32() {
        return 4_294_967_295;
    }
    @query([nat32], nat32)
    printNat32(nat32) {
        console.log(typeof nat32);
        return nat32;
    }
    @query([], nat16)
    getNat16() {
        return 65_535;
    }
    @query([nat16], nat16)
    printNat16(nat16) {
        console.log(typeof nat16);
        return nat16;
    }
    @query([], nat8)
    getNat8() {
        return 255;
    }
    @query([nat8], nat8)
    printNat8(nat8) {
        console.log(typeof nat8);
        return nat8;
    }
    @query([], float64)
    getFloat64() {
        return Math.E;
    }
    @query([float64], float64)
    printFloat64(float64) {
        console.log(typeof float64);
        return float64;
    }
    @query([], float32)
    getFloat32() {
        return Math.PI;
    }
    @query([float32], float32)
    printFloat32(float32) {
        console.log(typeof float32);
        return float32;
    }
    @query([], bool)
    getBool() {
        return true;
    }
    @query([bool], bool)
    printBool(bool) {
        console.log(typeof bool);
        return bool;
    }
    @query([], Principal)
    getPrincipal() {
        return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
    }
    @query([Principal], Principal)
    printPrincipal(principal) {
        console.log(typeof principal);
        return principal;
    }
    @query([], Null)
    getNull() {
        return null;
    }
    @query([Null], Null)
    printNull(Null) {
        console.log(typeof Null);
        return Null;
    }
    @query([], reserved)
    getReserved() {
        return 'anything';
    }
    @query([reserved], reserved)
    printReserved(reserved) {
        console.log(typeof reserved);
        return reserved;
    }
    @query([], empty)
    getEmpty() {
        throw 'Anything you want';
    }
    // Note: It is impossible to call this function because it requires an argument
    // but there is no way to pass an "empty" value as an argument.
    @query([empty], empty)
    printEmpty(empty) {
        console.log(typeof empty);
        throw 'Anything you want';
    }
}
