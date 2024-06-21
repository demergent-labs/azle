import { Canister, query, text } from 'azle/experimental';

export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    })
});
