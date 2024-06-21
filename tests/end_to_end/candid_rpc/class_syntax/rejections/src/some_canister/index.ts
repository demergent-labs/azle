import {
    bool,
    Canister,
    empty,
    ic,
    Manual,
    query,
    text
} from 'azle/experimental';

export default class {
    reject: query(
        [text],
        Manual(empty),
        (message) => {
            ic.reject(message);
        },
        { manual: true }
    ),

@query([], bool)
    accept(){
        return true;
    }),

    error: query(
        [],
        Manual(empty),
        () => {
            // This errors because neither ic.reject nor ic.reply were called
        },
        { manual: true }
    )
}
