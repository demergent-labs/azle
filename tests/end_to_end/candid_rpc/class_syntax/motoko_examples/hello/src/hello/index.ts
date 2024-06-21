import { IDL, query, update } from 'azle';

export default class {
    @query([text], text)
    greet(name) {
        return `Hello, ${name}!`;
    }
}
