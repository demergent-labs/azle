import { query, Void } from 'azle';

export default class {
    @query([], Void)
    main() {
        console.log('Hello World!');
    }
}
