import { IDL, query } from 'azle';

import { StableMap0 } from './stable_map_0';
import { StableMap1 } from './stable_map_1';
import { StableMap2 } from './stable_map_2';
import { StableMap3 } from './stable_map_3';
import { StableMap4 } from './stable_map_4';

export default [
    class {
        @query([], IDL.Bool)
        getRedeployed(): boolean {
            return globalThis._azlePostUpgradeCalled ?? false;
        }
    },
    StableMap0,
    StableMap1,
    StableMap2,
    StableMap3,
    StableMap4
];
