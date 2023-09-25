import { bool, heartbeat, query, Service } from 'azle';

let initialized = false;

export default Service({
    heartbeat: heartbeat(() => {
        initialized = true;
        console.log('heartbeat initialized', initialized);
    }),
    getInitialized: query([], bool, () => {
        return initialized;
    })
});
