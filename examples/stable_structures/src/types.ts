import { InsertError, Opt, Variant } from 'azle';

export type Key = string;
export type Value = string;

export type InsertResult = Variant<{
    ok: Opt<Value>;
    err: InsertError;
}>;
