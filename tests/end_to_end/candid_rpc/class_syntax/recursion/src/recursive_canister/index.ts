import { Canister, init, query, Recursive, text } from 'azle/experimental';

let myMessage = '';

const MyCanister = Recursive(() =>
    Canister({
@init([text])
        init(message){
            myMessage = message;
        }),
@query([MyCanister], MyCanister)
        myQuery(param)param),
@query([], text)
        getMessage()myMessage)
    })
);

export default MyCanister;
