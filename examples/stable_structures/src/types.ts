import { Record, Variant } from 'azle';

export type User = Record<{
    username: string;
    posts: BlogPost[];
}>;

export type BlogPost = Record<{
    title: string;
}>;

export type Reaction = Variant<{
    Happy: null;
    Sad: null;
}>;
