import { Null, Record, text, Variant, Vec } from 'azle';

export const BlogPost = Record({
    title: text
});

export const Reaction = Variant({
    Happy: Null,
    Sad: Null
});

export const User = Record({
    username: text,
    posts: Vec(BlogPost)
});
