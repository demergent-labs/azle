import { bool, heartbeat, query, Service } from 'azle';

export default class extends Service {
    initialized = false;

    @heartbeat
    heartbeat() {
        this.initialized = true;
        console.log('heartbeat initialized', this.initialized);
    }

    @query([], bool)
    getInitialized(): bool {
        return this.initialized;
    }
}
