export const idlFactory = ({ IDL }) => {
    const Post = IDL.Rec();
    const User = IDL.Rec();
    const Thread = IDL.Record({
        id: IDL.Text,
        title: IDL.Text,
        author: User,
        posts: IDL.Vec(Post)
    });
    const ReactionType = IDL.Variant({
        thumbsDown: IDL.Null,
        fire: IDL.Null,
        thumbsUp: IDL.Null
    });
    const Reaction = IDL.Record({
        id: IDL.Text,
        post: Post,
        author: User,
        reactionType: ReactionType
    });
    User.fill(
        IDL.Record({
            id: IDL.Text,
            username: IDL.Text,
            threads: IDL.Vec(Thread),
            posts: IDL.Vec(Post),
            reactions: IDL.Vec(Reaction)
        })
    );
    Post.fill(
        IDL.Record({
            id: IDL.Text,
            text: IDL.Text,
            author: User,
            thread: Thread,
            reactions: IDL.Vec(Reaction)
        })
    );
    return IDL.Service({
        createPost: IDL.Func(
            [IDL.Text, IDL.Text, IDL.Text, IDL.Nat32],
            [Post],
            []
        ),
        createReaction: IDL.Func(
            [IDL.Text, IDL.Text, ReactionType, IDL.Nat32],
            [Reaction],
            []
        ),
        createThread: IDL.Func([IDL.Text, IDL.Text, IDL.Nat32], [Thread], []),
        createUser: IDL.Func([IDL.Text, IDL.Nat32], [User], []),
        getAllPosts: IDL.Func([IDL.Nat32], [IDL.Vec(Post)], ['query']),
        getAllReactions: IDL.Func([IDL.Nat32], [IDL.Vec(Reaction)], ['query']),
        getAllThreads: IDL.Func([IDL.Nat32], [IDL.Vec(Thread)], ['query']),
        getAllUsers: IDL.Func([IDL.Nat32], [IDL.Vec(User)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
