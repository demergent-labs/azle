import { query, Void } from 'azle';

export default class {
    @query([], Void)
    main(): void {
        console.log('Hello World!');
    }
}
