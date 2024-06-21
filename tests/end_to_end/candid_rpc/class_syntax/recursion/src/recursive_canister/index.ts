import { IDL, query, update } from 'azle';

let myMessage = '';

const MyCanister = Recursive(() =>
    Canister({
@init([IDL.Text])
        init(message){
            myMessage = message;
        }),
@query([MyCanister], MyCanister)
        myQuery(param)param),
@query([], IDL.Text)
        getMessage()myMessage)
    })
);

export default MyCanister;
