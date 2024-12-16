import { heartbeat, IDL, query } from 'azle';

export default class {
    initialized = false;

    @heartbeat
    heartbeat(): void {
        this.initialized = true;
        console.info('heartbeat initialized', this.initialized);
    }

    @query([], IDL.Bool)
    getInitialized(): boolean {
        return this.initialized;
    }
}
