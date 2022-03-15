import {
    Query,
    Update,
    u32
} from 'azle';
import {
    Post,
    Posts
} from './candid_types';
import {
    state,
    StatePost
} from './state';
import { getThreadFromStateThread } from './threads';
import { getUserFromStateUser } from './users';

export function createPost(
    authorId: string,
    text: string,
    threadId: string,
    joinDepth: u32
): Update<Post> {
    const id = Object.keys(state.posts).length.toString();

    const statePost = {
        id,
        authorId,
        text,
        threadId
    };

    state.posts[id] = statePost;

    const post = getPostFromStatePost(statePost, joinDepth);

    return post;
}

export function getAllPosts(joinDepth: u32): Query<Posts> {
    return Object
        .values(state.posts)
        .map((statePost) => getPostFromStatePost(statePost, joinDepth));
}

export function getPostFromStatePost(
    statePost: StatePost,
    joinDepth: u32
): Post {
    const stateAuthor = state.users[statePost.authorId];
    const author = getUserFromStateUser(stateAuthor, joinDepth);

    const stateThread = state.threads[statePost.threadId];
    const thread = getThreadFromStateThread(stateThread, joinDepth);

    return {
        id: statePost.id,
        author,
        text: statePost.text,
        thread
    };
}