import { Query, Heartbeat } from 'azle';

let initialized = false;

export function heartbeat_(): Heartbeat {
    initialized = true;
    console.log('heartbeat initialized', initialized);
}

export function get_initialized(): Query<boolean> {
    return initialized;
}

// class API

import { heartbeat, query } from 'azle';

export default class {
    initialized = false;

    @heartbeat
    heartbeat_(): Heartbeat {
        this.initialized = true;
        console.log('heartbeat initialized', this.initialized);
    }

    @query
    get_initialized(): boolean {
        return this.initialized;
    }
}
