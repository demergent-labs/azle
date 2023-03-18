import { ReactionType } from './candid_types';

export let state: State = {
    posts: {},
    reactions: {},
    threads: {},
    users: {}
};

export type State = {
    posts: {
        [id: string]: StatePost;
    };
    reactions: {
        [id: string]: StateReaction;
    };
    threads: {
        [id: string]: StateThread;
    };
    users: {
        [id: string]: StateUser;
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
