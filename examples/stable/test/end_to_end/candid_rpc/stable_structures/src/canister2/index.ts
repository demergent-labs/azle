import { IDL, query } from 'azle';

import { StableMap5 } from './stable_map_5';
import { StableMap6 } from './stable_map_6';
import { StableMap7 } from './stable_map_7';
import { StableMap8 } from './stable_map_8';
import { StableMap9 } from './stable_map_9';

export default [
    class {
        @query([], IDL.Bool)
        getRedeployed(): boolean {
            return globalThis._azlePostUpgradeCalled ?? false;
        }
    },
    StableMap5,
    StableMap6,
    StableMap7,
    StableMap8,
    StableMap9
];
