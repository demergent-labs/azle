import { Record, Variant, Vec } from 'azle';

export type BlogPost = Record<{
    title: string;
}>;

export type Reaction = Variant<{
    Happy: null;
    Sad: null;
}>;

export type User = Record<{
    username: string;
    posts: Vec<BlogPost>;
}>;
