import { init, query, Recursive, text } from 'azle';

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
