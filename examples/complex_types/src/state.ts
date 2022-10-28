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
    author_id: string;
    reaction_ids: string[];
    text: string;
    thread_id: string;
};

export type StateReaction = {
    id: string;
    author_id: string;
    post_id: string;
    reaction_type: ReactionType;
};

export type StateThread = {
    id: string;
    author_id: string;
    post_ids: string[];
    title: string;
};

export type StateUser = {
    id: string;
    post_ids: string[];
    reaction_ids: string[];
    thread_ids: string[];
    username: string;
};
