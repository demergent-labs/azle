import { Service, query, text } from 'azle';

export default class extends Service {
    @query([text], text)
    greet(name: string): string {
        return `Hello, ${name}!`;
    }
}
