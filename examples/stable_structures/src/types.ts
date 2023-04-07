import { Alias, InsertError, Opt, Record, Result, Variant, Vec } from 'azle';

export type BlogPost = Record<{
    title: string;
}>;

export type InsertResult<T> = Alias<Result<Opt<T>, InsertError>>;

export type Reaction = Variant<{
    Happy: null;
    Sad: null;
}>;

export type User = Record<{
    username: string;
    posts: Vec<BlogPost>;
}>;
