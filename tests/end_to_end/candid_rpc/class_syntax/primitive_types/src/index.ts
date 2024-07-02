import { IDL, Principal, query } from 'azle';

export default class {
    @query([], IDL.Text)
    getString() {
        return 'string';
    }

    @query([IDL.Text], IDL.Text)
    printString(string: string) {
        console.log(typeof string);
        return string;
    }

    @query([], IDL.Text)
    getText() {
        return 'text';
    }

    @query([IDL.Text], IDL.Text)
    printText(text: string) {
        console.log(typeof text);
        return text;
    }

    @query([], IDL.Float64)
    getNumber() {
        return Number.MAX_SAFE_INTEGER;
    }

    @query([IDL.Float64], IDL.Float64)
    printNumber(number: number) {
        console.log(typeof number);
        return number;
    }

    @query([], IDL.Int)
    getInt() {
        return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
    }

    @query([IDL.Int], IDL.Int)
    printInt(int: bigint) {
        console.log(typeof int);
        return int;
    }

    @query([], IDL.Int64)
    getInt64() {
        return 9_223_372_036_854_775_807n;
    }

    @query([IDL.Int64], IDL.Int64)
    printInt64(int64: bigint) {
        console.log(typeof int64);
        return int64;
    }

    @query([], IDL.Int32)
    getInt32() {
        return 2_147_483_647;
    }

    @query([IDL.Int32], IDL.Int32)
    printInt32(int32: bigint) {
        console.log(typeof int32);
        return int32;
    }

    @query([], IDL.Int16)
    getInt16() {
        return 32_767;
    }

    @query([IDL.Int16], IDL.Int16)
    printInt16(int16: bigint) {
        console.log(typeof int16);
        return int16;
    }

    @query([], IDL.Int8)
    getInt8() {
        return 127;
    }

    @query([IDL.Int8], IDL.Int8)
    printInt8(int8: bigint) {
        console.log(typeof int8);
        return int8;
    }

    @query([], IDL.Nat)
    getNat() {
        return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
    }

    @query([IDL.Nat], IDL.Nat)
    printNat(nat: bigint) {
        console.log(typeof nat);
        return nat;
    }

    @query([], IDL.Nat64)
    getNat64() {
        return 18_446_744_073_709_551_615n;
    }

    @query([IDL.Nat64], IDL.Nat64)
    printNat64(nat64: bigint) {
        console.log(typeof nat64);
        return nat64;
    }

    @query([], IDL.Nat32)
    getNat32() {
        return 4_294_967_295;
    }

    @query([IDL.Nat32], IDL.Nat32)
    printNat32(nat32: number) {
        console.log(typeof nat32);
        return nat32;
    }

    @query([], IDL.Nat16)
    getNat16() {
        return 65_535;
    }

    @query([IDL.Nat16], IDL.Nat16)
    printNat16(nat16: number) {
        console.log(typeof nat16);
        return nat16;
    }

    @query([], IDL.Nat8)
    getNat8() {
        return 255;
    }

    @query([IDL.Nat8], IDL.Nat8)
    printNat8(nat8: number) {
        console.log(typeof nat8);
        return nat8;
    }

    @query([], IDL.Float64)
    getFloat64() {
        return Math.E;
    }

    @query([IDL.Float64], IDL.Float64)
    printFloat64(float64: number) {
        console.log(typeof float64);
        return float64;
    }

    @query([], IDL.Float32)
    getFloat32() {
        return Math.PI;
    }

    @query([IDL.Float32], IDL.Float32)
    printFloat32(float32: number) {
        console.log(typeof float32);
        return float32;
    }

    @query([], IDL.Bool)
    getBool() {
        return true;
    }

    @query([IDL.Bool], IDL.Bool)
    printBool(bool: boolean) {
        console.log(typeof bool);
        return bool;
    }

    @query([], IDL.Principal)
    getPrincipal() {
        return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
    }

    @query([IDL.Principal], IDL.Principal)
    printPrincipal(principal: Principal) {
        console.log(typeof principal);
        return principal;
    }

    @query([], IDL.Null)
    getNull() {
        return null;
    }

    @query([IDL.Null], IDL.Null)
    printNull(Null: null) {
        console.log(typeof Null);
        return Null;
    }

    @query([], IDL.Reserved)
    getReserved() {
        return 'anything';
    }

    @query([IDL.Reserved], IDL.Reserved)
    printReserved(reserved: any) {
        console.log(typeof reserved);
        return reserved;
    }

    @query([], IDL.Empty)
    getEmpty() {
        throw 'Anything you want';
    }
    // Note: It is impossible to call this function because it requires an argument
    // but there is no way to pass an "empty" value as an argument.
    @query([IDL.Empty], IDL.Empty)
    printEmpty(empty: any) {
        console.log(typeof empty);
        throw 'Anything you want';
    }
}
