import { query, text } from 'azle';

export default class {
    @query([text], text)
    greet(name: string): string {
        return `Hello, ${name}!`;
    }
}
