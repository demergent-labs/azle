// TODO we aren't really testing that the params and return type only accept CandidType
// TODO The return type is not being tested here

import {
    bool,
    nat,
    Null,
    Record,
    RequireExactlyOne,
    text,
    update,
    Variant
} from '../../src/lib/experimental';
import { AssertType, NotAnyAndExact } from '../assert_type';

const User = Record({
    id: text
});

const Reaction = Variant({
    Happy: Null,
    Sad: Null
});

update(
    [bool, nat, text, User, Reaction],
    text,
    (param0, param1, param2, param3, _param4) => {
        type _Param0 = AssertType<NotAnyAndExact<typeof param0, boolean>>;
        type _Param1 = AssertType<NotAnyAndExact<typeof param1, bigint>>;
        type _Param2 = AssertType<NotAnyAndExact<typeof param2, string>>;
        type _Param3 = AssertType<
            NotAnyAndExact<
                typeof param3,
                {
                    id: string;
                }
            >
        >;
        type _Param4 = AssertType<
            NotAnyAndExact<
                typeof _param4,
                RequireExactlyOne<{
                    Happy: null;
                    Sad: null;
                }>
            >
        >;

        return param2;
    },
    undefined,
    true
);
