import { nat32, query, Service, text, update, Vec } from 'azle';
import { Post } from './candid_types/post';
import { Reaction } from './candid_types/reaction';
import { ReactionType } from './candid_types/reaction_type';
import { Thread } from './candid_types/thread';
import { User } from './candid_types/user';
import { createPost, getAllPosts } from './posts';
import { createReaction, getAllReactions } from './reactions';
import { createThread, getAllThreads } from './threads';
import { createUser, getAllUsers } from './users';

export default class extends Service {
    @update([text, text, text, nat32], Post)
    createPost(
        authorId: text,
        text: text,
        threadId: text,
        joinDepth: nat32
    ): Post {
        return createPost(authorId, text, threadId, joinDepth);
    }

    @query([nat32], Vec(Post))
    getAllPosts(joinDepth: nat32): Vec<Post> {
        return getAllPosts(joinDepth);
    }

    @update([text, text, ReactionType, nat32], Reaction)
    createReaction(
        authorId: string,
        postId: string,
        reactionType: ReactionType,
        joinDepth: nat32
    ): Reaction {
        return createReaction(authorId, postId, reactionType, joinDepth);
    }

    @query([nat32], Vec(Reaction))
    getAllReactions(joinDepth: nat32): Vec<Reaction> {
        return getAllReactions(joinDepth);
    }

    @update([text, text, nat32], Thread)
    createThread(title: text, authorId: text, joinDepth: nat32): Thread {
        return createThread(title, authorId, joinDepth);
    }

    @query([nat32], Vec(Thread))
    getAllThreads(joinDepth: nat32): Vec<Thread> {
        return getAllThreads(joinDepth);
    }

    @update([text, nat32], User)
    createUser(username: string, joinDepth: nat32): User {
        return createUser(username, joinDepth);
    }

    @query([nat32], Vec(User))
    getAllUsers(joinDepth: nat32): Vec<User> {
        return getAllUsers(joinDepth);
    }
}
