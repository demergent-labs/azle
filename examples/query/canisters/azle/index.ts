import { query, Service, text } from 'azle';

export default class extends Service {
    @query([], text)
    simpleQuery(): text {
        return 'This is a query function';
    }
}
