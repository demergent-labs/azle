import { candid, record, Record, text } from 'azle';
import { Post } from './post';
import { ReactionType } from './reaction_type';
import { User } from './user';

@record
export class Reaction extends Record {
    @candid(text)
    id: text;

    @candid(User)
    author: User;

    @candid(Post)
    post: Post;

    @candid(ReactionType)
    reactionType: ReactionType;
}
