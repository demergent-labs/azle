import { IDL, query, update } from 'azle';

import { createPost, getAllPosts } from './posts';
import { createReaction, getAllReactions } from './reactions';
import { createThread, getAllThreads } from './threads';
import { createUser, getAllUsers } from './users';

export default class {
    createPost,
    getAllPosts,
    createReaction,
    getAllReactions,
    createThread,
    getAllThreads,
    createUser,
    getAllUsers
}
