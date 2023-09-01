import { candid, record, Record, text, Vec } from 'azle';
import { Post } from './post';
import { Reaction } from './reaction';
import { Thread } from './thread';

@record
export class User extends Record {
    @candid(text)
    id: text;

    @candid(Vec(Post))
    posts: Vec<Post>;

    @candid(Vec(Reaction))
    reactions: Vec<Reaction>;

    @candid(Vec(Thread))
    threads: Vec<Thread>;

    @candid(text)
    username: text;
}
