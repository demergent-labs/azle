import {
    bool,
    Canister,
    empty,
    float32,
    float64,
    int,
    int16,
    int32,
    int64,
    int8,
    nat,
    nat16,
    nat32,
    nat64,
    nat8,
    Null,
    Principal,
    query,
    reserved,
    text
} from 'azle';

export default Canister({
    getString: query([], text, () => {
        return 'string';
    }),
    printString: query([text], text, (string) => {
        console.log(typeof string);
        return string;
    }),
    getText: query([], text, () => {
        return 'text';
    }),
    printText: query([text], text, (text) => {
        console.log(typeof text);
        return text;
    }),
    getNumber: query([], float64, () => {
        return Number.MAX_SAFE_INTEGER;
    }),
    printNumber: query([float64], float64, (number) => {
        console.log(typeof number);
        return number;
    }),
    getInt: query([], int, () => {
        return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
    }),
    printInt: query([int], int, (int) => {
        console.log(typeof int);
        return int;
    }),
    getInt64: query([], int64, () => {
        return 9_223_372_036_854_775_807n;
    }),
    printInt64: query([int64], int64, (int64) => {
        console.log(typeof int64);
        return int64;
    }),
    getInt32: query([], int32, () => {
        return 2_147_483_647;
    }),
    printInt32: query([int32], int32, (int32) => {
        console.log(typeof int32);
        return int32;
    }),
    getInt16: query([], int16, () => {
        return 32_767;
    }),
    printInt16: query([int16], int16, (int16) => {
        console.log(typeof int16);
        return int16;
    }),
    getInt8: query([], int8, () => {
        return 127;
    }),
    printInt8: query([int8], int8, (int8) => {
        console.log(typeof int8);
        return int8;
    }),
    getNat: query([], nat, () => {
        return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
    }),
    printNat: query([nat], nat, (nat) => {
        console.log(typeof nat);
        return nat;
    }),
    getNat64: query([], nat64, () => {
        return 18_446_744_073_709_551_615n;
    }),
    printNat64: query([nat64], nat64, (nat64) => {
        console.log(typeof nat64);
        return nat64;
    }),
    getNat32: query([], nat32, () => {
        return 4_294_967_295;
    }),
    printNat32: query([nat32], nat32, (nat32) => {
        console.log(typeof nat32);
        return nat32;
    }),
    getNat16: query([], nat16, () => {
        return 65_535;
    }),
    printNat16: query([nat16], nat16, (nat16) => {
        console.log(typeof nat16);
        return nat16;
    }),
    getNat8: query([], nat8, () => {
        return 255;
    }),
    printNat8: query([nat8], nat8, (nat8) => {
        console.log(typeof nat8);
        return nat8;
    }),
    getFloat64: query([], float64, () => {
        return Math.E;
    }),
    printFloat64: query([float64], float64, (float64) => {
        console.log(typeof float64);
        return float64;
    }),
    getFloat32: query([], float32, () => {
        return Math.PI;
    }),
    printFloat32: query([float32], float32, (float32) => {
        console.log(typeof float32);
        return float32;
    }),
    getBool: query([], bool, () => {
        return true;
    }),
    printBool: query([bool], bool, (bool) => {
        console.log(typeof bool);
        return bool;
    }),
    getPrincipal: query([], Principal, () => {
        return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
    }),
    printPrincipal: query([Principal], Principal, (principal) => {
        console.log(typeof principal);
        return principal;
    }),
    getNull: query([], Null, () => {
        return null;
    }),
    printNull: query([Null], Null, (Null) => {
        console.log(typeof Null);
        return Null;
    }),
    getReserved: query([], reserved, () => {
        return 'anything';
    }),
    printReserved: query([reserved], reserved, (reserved) => {
        console.log(typeof reserved);
        return reserved;
    }),
    getEmpty: query([], empty, () => {
        throw 'Anything you want';
    }),
    // Note: It is impossible to call this function because it requires an argument
    // but there is no way to pass an "empty" value as an argument.
    printEmpty: query([empty], empty, (empty) => {
        console.log(typeof empty);
        throw 'Anything you want';
    })
});
