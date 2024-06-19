import { IDL, query } from 'azle';

import { StableMap0Methods } from './stable_map_0';
// import { stableMap1Methods } from './stable_map_1';
// import { stableMap2Methods } from './stable_map_2';
// import { stableMap3Methods } from './stable_map_3';
// import { stableMap4Methods } from './stable_map_4';

// let redeployed = false;

export default class extends StableMap0Methods {
    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return globalThis._azlePostUpgradeCalled;
    }

    @query([])
    test() {
        console.log(this.stableMap0ContainsKey(0));
        // console.log(this.returnsANumber());
    }

    returnsANumber() {
        return 5;
    }
}

// Object.assign(Canister.prototype, new StableMap0Methods());

// export default Canister({
//     postUpgrade: postUpgrade([], () => {
//         redeployed = true;
//     }),
//     getRedeployed: query([], bool, () => {
//         return redeployed;
//     }),
//     ...stableMap0Methods,
//     ...stableMap1Methods,
//     ...stableMap2Methods,
//     ...stableMap3Methods,
//     ...stableMap4Methods
// });
