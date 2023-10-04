import { Canister, query, text } from 'azle';

export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    })
});
