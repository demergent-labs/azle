import { IDL, query, update } from 'azle';

export default class {
    @query([IDL.Text], IDL.Text)
    greet(name) {
        return `Hello, ${name}!`;
    }
}
