import { bool, float64, int, Null, query, text, Void } from 'azle';

export const MyBool = bool;
export const MyNull = Null;
export const MyString = text;
export const MyBigInt = int;
export const MyNumber = float64;
export const MyVoid = Void;

export const checkPrimAliases = query(
    [MyBool, MyNull, MyString, MyBigInt, MyNumber],
    MyVoid,
    (param1, param2, param3, param4, param5) => {
        if (param1) {
            console.log(`${param2}, ${param3}, ${param4}, ${param5}`);
        }
    }
);
