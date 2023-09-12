import { bool, query, Service, text, update } from 'azle';

export default class extends Service {
    @query([], bool)
    query1(): bool {
        return true;
    }

    @update([], text)
    update1(): text {
        return 'SomeService update1';
    }
}
