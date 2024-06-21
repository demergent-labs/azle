import { IDL, query, update } from 'azle';

export default class {
    @query([])
    main() {
        console.log('Hello World!');
    }
}
