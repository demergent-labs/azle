import { bool, Canister, heartbeat, query } from 'azle';

let initialized = false;

export default Canister({
    heartbeat: heartbeat(() => {
        initialized = true;
        console.log('heartbeat initialized', initialized);
    }),
    getInitialized: query([], bool, () => {
        return initialized;
    })
});
