import { candid, record, Record, text, Vec } from 'azle';
import { Reaction } from './reaction';
import { Thread } from './thread';
import { User } from './user';

@record
export class Post extends Record {
    @candid(text)
    id: text;

    @candid(User)
    author: User;

    @candid(Vec(Reaction))
    reactions: Vec<Reaction>;

    @candid(text)
    text: text;

    @candid(Thread)
    thread: Thread;
}
