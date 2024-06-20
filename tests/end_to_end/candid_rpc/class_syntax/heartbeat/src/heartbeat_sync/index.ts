import { heartbeat, IDL, query } from 'azle';

let initialized = false;

export default class {
    @heartbeat
    heartbeat() {
        initialized = true;
        console.log('heartbeat initialized', initialized);
    }

    @query([], IDL.Bool)
    getInitialized() {
        return initialized;
    }
}
