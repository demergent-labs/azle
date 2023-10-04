import { bool, Canister, postUpgrade, query } from 'azle';
import { stableMap5Methods } from './stable_map_5';
import { stableMap6Methods } from './stable_map_6';
import { stableMap7Methods } from './stable_map_7';
import { stableMap8Methods } from './stable_map_8';
import { stableMap9Methods } from './stable_map_9';

let redeployed = false;

export default Canister({
    postUpgrade: postUpgrade([], () => {
        redeployed = true;
    }),
    getRedeployed: query([], bool, () => {
        return redeployed;
    }),
    ...stableMap5Methods,
    ...stableMap6Methods,
    ...stableMap7Methods,
    ...stableMap8Methods,
    ...stableMap9Methods
});
