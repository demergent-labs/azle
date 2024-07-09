import { query } from 'azle';

export default class {
    @query([])
    main(): void {
        console.log('Hello World!');
    }
}
