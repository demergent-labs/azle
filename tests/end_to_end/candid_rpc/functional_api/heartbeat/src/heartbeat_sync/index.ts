import { bool, Canister, heartbeat, query } from 'azle/experimental';

let initialized = false;

export default Canister({
    heartbeat: heartbeat(() => {
        initialized = true;
        console.info('heartbeat initialized', initialized);
    }),
    getInitialized: query([], bool, () => {
        return initialized;
    })
});
