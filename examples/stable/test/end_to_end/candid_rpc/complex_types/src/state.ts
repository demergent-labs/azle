import { ReactionType } from './candid_types';

export type State = {
    posts: {
        [id: string]: StatePost | undefined;
    };
    reactions: {
        [id: string]: StateReaction | undefined;
    };
    threads: {
        [id: string]: StateThread | undefined;
    };
    users: {
        [id: string]: StateUser | undefined;
    };
};

export type StatePost = {
    id: string;
    authorId: string;
    reactionIds: string[];
    text: string;
    threadId: string;
};

export type StateReaction = {
    id: string;
    authorId: string;
    postId: string;
    reactionType: ReactionType;
};

export type StateThread = {
    id: string;
    authorId: string;
    postIds: string[];
    title: string;
};

export type StateUser = {
    id: string;
    postIds: string[];
    reactionIds: string[];
    threadIds: string[];
    username: string;
};
