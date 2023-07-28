import { $query } from 'azle';

export type MyBool = boolean;
export type MyNull = null;
export type MyString = string;
export type MyBigInt = bigint;
export type MyNumber = number;
export type MyVoid = void;

$query;
export function checkPrimAliases(
    param1: MyBool,
    param2: MyNull,
    param3: MyString,
    param4: MyBigInt,
    param5: MyNumber
): MyVoid {
    if (param1) {
        console.log(`${param2}, ${param3}, ${param4}, ${param5}`);
    }
}
