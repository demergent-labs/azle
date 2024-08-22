import { IDL, query } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text)
    greet(name: string): string {
        return `Hello, ${name}!`;
    }
}
