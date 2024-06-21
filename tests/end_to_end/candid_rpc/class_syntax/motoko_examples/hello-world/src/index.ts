import { IDL, query, update } from 'azle';

export default class {
    @query([], Void)
    main() {
        console.log('Hello World!');
    }
}
