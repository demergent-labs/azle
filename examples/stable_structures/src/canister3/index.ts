import { bool, Canister, postUpgrade, query } from 'azle';

import { stableMap10Methods } from './stable_map_10';
import { stableMap11Methods } from './stable_map_11';
import { stableMap12Methods } from './stable_map_12';
import { stableMap13Methods } from './stable_map_13';

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
    ...stableMap13Methods
});
