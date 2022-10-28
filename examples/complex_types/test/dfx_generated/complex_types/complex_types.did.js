export const idlFactory = ({ IDL }) => {
    const Box = IDL.Rec();
    const Post = IDL.Rec();
    Box.fill(
        IDL.Record({
            id: IDL.Text,
            username: IDL.Text,
            threads: IDL.Vec(
                IDL.Record({
                    id: IDL.Text,
                    title: IDL.Text,
                    author: Box,
                    posts: IDL.Vec(Post)
                })
            ),
            posts: IDL.Vec(Post),
            reactions: IDL.Vec(
                IDL.Record({
                    id: IDL.Text,
                    reaction_type: IDL.Variant({
                        Fire: IDL.Null,
                        ThumbsDown: IDL.Null,
                        ThumbsUp: IDL.Null
                    }),
                    post: Post,
                    author: Box
                })
            )
        })
    );
    Post.fill(
        IDL.Record({
            id: IDL.Text,
            text: IDL.Text,
            author: IDL.Record({
                id: IDL.Text,
                username: IDL.Text,
                threads: IDL.Vec(
                    IDL.Record({
                        id: IDL.Text,
                        title: IDL.Text,
                        author: Box,
                        posts: IDL.Vec(Post)
                    })
                ),
                posts: IDL.Vec(Post),
                reactions: IDL.Vec(
                    IDL.Record({
                        id: IDL.Text,
                        reaction_type: IDL.Variant({
                            Fire: IDL.Null,
                            ThumbsDown: IDL.Null,
                            ThumbsUp: IDL.Null
                        }),
                        post: Post,
                        author: Box
                    })
                )
            }),
            thread: IDL.Record({
                id: IDL.Text,
                title: IDL.Text,
                author: Box,
                posts: IDL.Vec(Post)
            }),
            reactions: IDL.Vec(
                IDL.Record({
                    id: IDL.Text,
                    reaction_type: IDL.Variant({
                        Fire: IDL.Null,
                        ThumbsDown: IDL.Null,
                        ThumbsUp: IDL.Null
                    }),
                    post: Post,
                    author: Box
                })
            )
        })
    );
    const ReactionType = IDL.Variant({
        Fire: IDL.Null,
        ThumbsDown: IDL.Null,
        ThumbsUp: IDL.Null
    });
    const Reaction = IDL.Record({
        id: IDL.Text,
        reaction_type: ReactionType,
        post: Post,
        author: Box
    });
    const Thread = IDL.Record({
        id: IDL.Text,
        title: IDL.Text,
        author: Box,
        posts: IDL.Vec(Post)
    });
    const User = IDL.Record({
        id: IDL.Text,
        username: IDL.Text,
        threads: IDL.Vec(Thread),
        posts: IDL.Vec(Post),
        reactions: IDL.Vec(Reaction)
    });
    return IDL.Service({
        create_post: IDL.Func(
            [IDL.Text, IDL.Text, IDL.Text, IDL.Nat32],
            [Post],
            []
        ),
        create_reaction: IDL.Func(
            [IDL.Text, IDL.Text, ReactionType, IDL.Nat32],
            [Reaction],
            []
        ),
        create_thread: IDL.Func([IDL.Text, IDL.Text, IDL.Nat32], [Thread], []),
        create_user: IDL.Func([IDL.Text, IDL.Nat32], [User], []),
        get_all_posts: IDL.Func([IDL.Nat32], [IDL.Vec(Post)], ['query']),
        get_all_reactions: IDL.Func(
            [IDL.Nat32],
            [IDL.Vec(Reaction)],
            ['query']
        ),
        get_all_threads: IDL.Func([IDL.Nat32], [IDL.Vec(Thread)], ['query']),
        get_all_users: IDL.Func([IDL.Nat32], [IDL.Vec(User)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
