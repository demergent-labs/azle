import { Canister, query, text } from 'azle/experimental';

export default class {
    @query([text], text)
    greet(name) {
        return `Hello, ${name}!`;
    }
}
