import { Func, Null, Record, text, Variant, Vec } from 'azle';

export const BlogPost = Record({
    title: text
});

export const Reaction = Variant({
    Happy: Null,
    Sad: Null
});
export type Reaction = typeof Reaction;

export const User = Record({
    username: text,
    posts: Vec(BlogPost)
});
export type User = typeof User;

export const Callback = Func([BlogPost], Reaction, 'update');
export type Callback = typeof Callback;
