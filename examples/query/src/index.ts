import { Canister, query, text } from 'azle';

export default Canister({
    simpleQuery: query([], text, () => {
        return 'This is a query function';
    })
});
