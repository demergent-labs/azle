import { Query } from 'azle';

export function echo(message: string): Query<string> {
    return message;
}