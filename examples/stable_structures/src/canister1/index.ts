import { Service } from 'azle';
import { stableMap0Methods } from './stable_map_0';
import { stableMap1Methods } from './stable_map_1';
import { stableMap2Methods } from './stable_map_2';
import { stableMap3Methods } from './stable_map_3';
import { stableMap4Methods } from './stable_map_4';

export default Service({
    ...stableMap0Methods,
    ...stableMap1Methods,
    ...stableMap2Methods,
    ...stableMap3Methods,
    ...stableMap4Methods
});
