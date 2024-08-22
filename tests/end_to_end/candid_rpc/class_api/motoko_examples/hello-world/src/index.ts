import { query } from 'azle';

export default class {
    @query([])
    main(): void {
        console.info('Hello World!');
    }
}
