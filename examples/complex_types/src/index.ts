import { nat32, query, Canister, text, update, Vec } from 'azle';
import { Post, Reaction, ReactionType, Thread, User } from './candid_types';
import { createPost, getAllPosts } from './posts';
import { createReaction, getAllReactions } from './reactions';
import { createThread, getAllThreads } from './threads';
import { createUser, getAllUsers } from './users';

export default Canister({
    createPost,

    getAllPosts: query([nat32], Vec(Post), (joinDepth) => {
        return getAllPosts(joinDepth);
    }),

    createReaction: update(
        [text, text, ReactionType, nat32],
        Reaction,
        (authorId, postId, reactionType, joinDepth) => {
            return createReaction(authorId, postId, reactionType, joinDepth);
        }
    ),

    getAllReactions: query([nat32], Vec(Reaction), (joinDepth) => {
        return getAllReactions(joinDepth);
    }),

    createThread: update(
        [text, text, nat32],
        Thread,
        (title, authorId, joinDepth) => {
            return createThread(title, authorId, joinDepth);
        }
    ),

    getAllThreads: query([nat32], Vec(Thread), (joinDepth) => {
        return getAllThreads(joinDepth);
    }),

    createUser: update([text, nat32], User, (username, joinDepth) => {
        return createUser(username, joinDepth);
    }),

    getAllUsers: query([nat32], Vec(User), (joinDepth) => {
        return getAllUsers(joinDepth);
    })
});
