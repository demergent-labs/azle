type Canister = {
    name: string;
    dfxDir: string;
    packageJsonDir: string;
    expectedBin: string;
    method: string;
    result: string;
};

export const CANISTERS: Canister[] = [
    {
        name: 'ancestor_current',
        dfxDir: 'workspaces/ancestor',
        packageJsonDir: 'workspaces/ancestor/canisters/current',
        expectedBin: 'workspaces/ancestor/canisters/current',
        method: 'getAzleVersionFromAncestorCurrent',
        result: '0.30.0'
    },
    {
        name: 'ancestor_old',
        dfxDir: 'workspaces/ancestor',
        packageJsonDir: 'workspaces/ancestor/canisters/old',
        expectedBin: 'workspaces/ancestor/canisters/old',
        method: 'getAzleVersionFromAncestorOld',
        result: '0.29.0'
    },
    {
        name: 'descendant_different',
        dfxDir: 'workspaces/descendant_different/dfx',
        packageJsonDir: 'workspaces/descendant_different',
        expectedBin: 'workspaces/descendant_different',
        method: 'getAzleVersionFromDescendantDifferent',
        result: '0.30.0'
    },
    {
        name: 'descendant_same',
        dfxDir: 'workspaces/descendant_same/src',
        packageJsonDir: 'workspaces/descendant_same',
        expectedBin: 'workspaces/descendant_same',
        method: 'getAzleVersionFromDescendantSame',
        result: '0.30.0'
    },
    {
        name: 'sibling',
        dfxDir: 'workspaces/siblings',
        packageJsonDir: 'workspaces/siblings',
        expectedBin: 'workspaces/siblings',
        method: 'getAzleVersionFromSibling',
        result: '0.30.0'
    },
    {
        name: 'w_ancestor_current',
        dfxDir: 'workspaces/w_ancestor',
        packageJsonDir: 'workspaces/w_ancestor/canisters/current',
        expectedBin: 'workspaces/w_ancestor',
        method: 'getAzleVersionFromWAncestorCurrent',
        result: '0.30.0'
    },
    {
        name: 'w_ancestor_old',
        dfxDir: 'workspaces/w_ancestor',
        packageJsonDir: 'workspaces/w_ancestor/canisters/old',
        expectedBin: 'workspaces/w_ancestor/canisters/old',
        method: 'getAzleVersionFromWAncestorOld',
        result: '0.29.0'
    },
    {
        name: 'w_descendant_different',
        dfxDir: 'workspaces/w_descendant/canisters/different/dfx',
        packageJsonDir: 'workspaces/w_descendant/canisters/different',
        expectedBin: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantDifferent',
        result: '0.30.0'
    },
    {
        name: 'w_descendant_different_deep',
        dfxDir: 'workspaces/w_descendant/canisters/different_deep/dfx/deeper',
        packageJsonDir: 'workspaces/w_descendant/canisters/different_deep',
        expectedBin: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantDifferentDeep',
        result: '0.30.0'
    },
    {
        name: 'w_descendant_same',
        dfxDir: 'workspaces/w_descendant/canisters/same/src',
        packageJsonDir: 'workspaces/w_descendant/canisters/same',
        expectedBin: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantSame',
        result: '0.30.0'
    },
    {
        name: 'w_descendant_same_deep',
        dfxDir: 'workspaces/w_descendant/canisters/same_deep/src/dfx',
        packageJsonDir: 'workspaces/w_descendant/canisters/same_deep',
        expectedBin: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantSameDeep',
        result: '0.30.0'
    },
    {
        name: 'w_sibling',
        dfxDir: 'workspaces/w_siblings/w_sibling',
        packageJsonDir: 'workspaces/w_siblings/w_sibling',
        expectedBin: 'workspaces/w_siblings',
        method: 'getAzleVersionFromWSibling',
        result: '0.30.0'
    }
];
