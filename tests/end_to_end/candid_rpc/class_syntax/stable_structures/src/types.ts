import { IDL, query, update } from 'azle';

export const Reaction = IDL.Variant({
    Happy: IDL.Null,
    Sad: IDL.Null
});
export type Reaction = { Happy: null } | { Sad: null };

const BlogPost = IDL.Record({
    title: IDL.Text
});
type BlogPost = {
    title: string;
};

export const User = IDL.Record({
    username: IDL.Text,
    posts: IDL.Vec(BlogPost)
});
export type User = {
    username: string;
    posts: BlogPost[];
};

export const Callback = IDL.Func([BlogPost], [Reaction]);
export type Callback = [Principal, string];
