import { candid, Null, Record, text, Variant, Vec } from 'azle';

export class BlogPost extends Record {
    @candid(text)
    title: text;
}

export class Reaction extends Variant {
    @candid(Null)
    Happy?: Null;

    @candid(Null)
    Sad?: Null;
}

export class User extends Record {
    @candid(text)
    username: text;

    @candid(Vec(BlogPost))
    posts: Vec<BlogPost>;
}
