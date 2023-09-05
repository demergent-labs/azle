import { query, Service, Void } from 'azle';

export default class extends Service {
    @query([], Void)
    main(): void {
        console.log('Hello World!');
    }
}
