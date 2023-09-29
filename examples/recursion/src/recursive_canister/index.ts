import { query, Canister, Recursive } from 'azle';

const MyCanister = Recursive(() =>
    Canister({
        myQuery: query([MyCanister], MyCanister, (param) => param)
    })
);

export default MyCanister.idlCallback();
