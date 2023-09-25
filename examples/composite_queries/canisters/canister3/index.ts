import { query, Service, text } from 'azle';

export default Service({
    deepQuery: query([], text, () => {
        return 'Hello from Canister 3';
    })
});
