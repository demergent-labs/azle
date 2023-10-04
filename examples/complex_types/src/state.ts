import { Vec } from 'azle';
import { ReactionType } from './candid_types';

// TODO this state should go on the class
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
    reactionIds: Vec<string>;
    text: string;
    threadId: string;
};

export type StateReaction = {
    id: string;
    authorId: string;
    postId: string;
    reactionType: typeof ReactionType;
};

export type StateThread = {
    id: string;
    authorId: string;
    postIds: Vec<string>;
    title: string;
};

export type StateUser = {
    id: string;
    postIds: Vec<string>;
    reactionIds: Vec<string>;
    threadIds: Vec<string>;
    username: string;
};
