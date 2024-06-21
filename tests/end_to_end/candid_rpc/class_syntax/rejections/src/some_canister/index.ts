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
    @query([text], empty, { manual: true})
    reject(message){
            ic.reject(message);
        },
        { manual: true }
    ),

@query([], bool)
    accept(){
        return true;
    }),
    @query([], empty, { manual: true})
    error(){
            // This errors because neither ic.reject nor ic.reply were called
        },
        { manual: true }
    )
}
