import { Canister, query, text } from 'azle/experimental';

export default Canister({
    deepQuery: query([], text, () => {
        return 'Hello from Canister 3';
    })
});
