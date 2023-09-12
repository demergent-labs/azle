import { Service, query, text } from 'azle';

export default class extends Service {
    @query([], text)
    deepQuery(): text {
        return 'Hello from Canister 3';
    }
}
