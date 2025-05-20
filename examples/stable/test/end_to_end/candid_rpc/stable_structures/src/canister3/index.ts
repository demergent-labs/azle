import { IDL, query } from 'azle';

import { StableMap10 } from './stable_map_10';
import { StableMap11 } from './stable_map_11';
import { StableMap12 } from './stable_map_12';
import { StableMap13 } from './stable_map_13';
import { StableMap14 } from './stable_map_14';
import { StableMap15 } from './stable_map_15';
import { StableMap16 } from './stable_map_16';
import { StableMap17 } from './stable_map_17';

export default [
    class {
        @query([], IDL.Bool)
        getRedeployed(): boolean {
            return globalThis._azlePostUpgradeCalled ?? false;
        }
    },
    StableMap10,
    StableMap11,
    StableMap12,
    StableMap13,
    StableMap14,
    StableMap15,
    StableMap16,
    StableMap17
];
