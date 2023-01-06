import { Variant } from 'azle';

export type User = {
    username: string;
    blog_posts: BlogPost[];
};

export type BlogPost = {
    title: string;
};

export type Reaction = Variant<{
    Happy: null;
    Sad: null;
}>;
