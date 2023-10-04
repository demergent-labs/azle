import { query, Canister, Recursive, text, init } from 'azle';

let myMessage = '';

const MyCanister = Recursive(() =>
    Canister({
        init: init([text], (message) => {
            myMessage = message;
        }),
        myQuery: query([MyCanister], MyCanister, (param) => param),
        getMessage: query([], text, () => myMessage)
    })
);

export default MyCanister;
