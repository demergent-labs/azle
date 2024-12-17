import { Canister, query, text } from 'azle/experimental';

export default Canister({
    simpleQuery: query([], text, () => {
        return 'This is a query function';
    })
});
