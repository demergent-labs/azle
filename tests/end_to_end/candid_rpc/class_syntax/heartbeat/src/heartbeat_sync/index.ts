import { heartbeat, IDL, query } from 'azle';

let initialized = false;

export default class {
    @heartbeat
    heartbeat(): void {
        initialized = true;
        console.log('heartbeat initialized', initialized);
    }

    @query([], IDL.Bool)
    getInitialized(): boolean {
        return initialized;
    }
}
