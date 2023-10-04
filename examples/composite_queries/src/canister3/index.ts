import { Canister, query, text } from 'azle';

export default Canister({
    deepQuery: query([], text, () => {
        return 'Hello from Canister 3';
    })
});
