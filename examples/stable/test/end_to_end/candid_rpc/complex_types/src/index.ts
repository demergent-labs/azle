import { IDL, query, update } from 'azle';

import { Post, Reaction, ReactionType, Thread, User } from './candid_types';
import * as posts from './posts';
import * as reactions from './reactions';
import { State } from './state';
import * as threads from './threads';
import * as users from './users';

export default class Canister {
    state: State = {
        posts: {},
        reactions: {},
        threads: {},
        users: {}
    };

    @update([IDL.Text, IDL.Text, IDL.Text, IDL.Nat32], Post)
    createPost(
        authorId: string,
        text: string,
        threadId: string,
        joinDepth: number
    ): Post {
        return posts.createPost(this, authorId, text, threadId, joinDepth);
    }

    @query([IDL.Nat32], IDL.Vec(Post))
    getAllPosts(joinDepth: number): Post[] {
        return posts.getAllPosts(this, joinDepth);
    }

    @update([IDL.Text, IDL.Text, ReactionType, IDL.Nat32], Reaction)
    createReaction(
        authorId: string,
        postId: string,
        reactionType: ReactionType,
        joinDepth: number
    ): Reaction {
        return reactions.createReaction(
            this,
            authorId,
            postId,
            reactionType,
            joinDepth
        );
    }

    @query([IDL.Nat32], IDL.Vec(Reaction))
    getAllReactions(joinDepth: number): Reaction[] {
        return reactions.getAllReactions(this, joinDepth);
    }

    @update([IDL.Text, IDL.Text, IDL.Nat32], Thread)
    createThread(title: string, authorId: string, joinDepth: number): Thread {
        return threads.createThread(this, title, authorId, joinDepth);
    }

    @query([IDL.Nat32], IDL.Vec(Thread))
    getAllThreads(joinDepth: number): Thread[] {
        return threads.getAllThreads(this, joinDepth);
    }

    @update([IDL.Text, IDL.Nat32], User)
    createUser(username: string, joinDepth: number): User {
        return users.createUser(this, username, joinDepth);
    }

    @query([IDL.Nat32], IDL.Vec(User))
    getAllUsers(joinDepth: number): User[] {
        return users.getAllUsers(this, joinDepth);
    }
}
