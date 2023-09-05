import { candid, Null, Variant } from 'azle';

export class ReactionType extends Variant {
    @candid(Null)
    Fire?: null;

    @candid(Null)
    ThumbsUp?: null;

    @candid(Null)
    ThumbsDown?: null;
}
