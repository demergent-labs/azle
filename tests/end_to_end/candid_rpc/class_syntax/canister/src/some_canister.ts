import { bool, Canister, query, text, update } from 'azle/experimental';

export default Canister({
    query1: query([], bool, () => {
        return true;
    }),
    update1: update([], text, () => {
        return 'SomeCanister update1';
    })
});
