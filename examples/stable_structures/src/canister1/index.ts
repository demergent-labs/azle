import { bool, Canister, postUpgrade, query } from 'azle';
import { stableMap0Methods } from './stable_map_0';
import { stableMap1Methods } from './stable_map_1';
import { stableMap2Methods } from './stable_map_2';
import { stableMap3Methods } from './stable_map_3';
import { stableMap4Methods } from './stable_map_4';

let redeployed = false;

export default Canister({
    postUpgrade: postUpgrade([], () => {
        redeployed = true;
    }),
    getRedeployed: query([], bool, () => {
        return redeployed;
    }),
    ...stableMap0Methods,
    ...stableMap1Methods,
    ...stableMap2Methods,
    ...stableMap3Methods,
    ...stableMap4Methods
});
