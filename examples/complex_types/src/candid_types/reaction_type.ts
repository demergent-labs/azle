import { candid, Null, variant, Variant } from 'azle';

@variant
export class ReactionType extends Variant {
    @candid(Null)
    Fire?: null;

    @candid(Null)
    ThumbsUp?: null;

    @candid(Null)
    ThumbsDown?: null;
}
