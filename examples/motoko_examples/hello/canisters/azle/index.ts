import { Query } from 'azle';

export function greet(name: string): Query<string> {
    return `Hello, ${name}!`;
}
