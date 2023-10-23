import { bool, Canister, postUpgrade, query } from 'azle';

import { stableMap10Methods } from './stable_map_10';
import { stableMap11Methods } from './stable_map_11';
import { stableMap12Methods } from './stable_map_12';
import { stableMap13Methods } from './stable_map_13';
import { stableMap14Methods } from './stable_map_14';
import { stableMap15Methods } from './stable_map_15';
import { stableMap16Methods } from './stable_map_16';
import { stableMap17Methods } from './stable_map_17';

let redeployed = false;

export default Canister({
    postUpgrade: postUpgrade([], () => {
        redeployed = true;
    }),
    getRedeployed: query([], bool, () => {
        return redeployed;
    }),
    ...stableMap10Methods,
    ...stableMap11Methods,
    ...stableMap12Methods,
    ...stableMap13Methods,
    ...stableMap14Methods,
    ...stableMap15Methods,
    ...stableMap16Methods,
    ...stableMap17Methods
});
