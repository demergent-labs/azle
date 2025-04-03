type Canister = {
    name: string;
    packageSuffix: string;
    dfxDir: string;
    nodeModulesLocation: string;
    method: string;
};

export const CANISTERS: Canister[] = [
    {
        name: 'ancestor_current',
        packageSuffix: 'ancestor-current',
        dfxDir: 'workspaces/ancestor',
        nodeModulesLocation: 'workspaces/ancestor/canisters/current',
        method: 'getAzleVersionFromAncestorCurrent'
    },
    {
        name: 'ancestor_old',
        packageSuffix: 'ancestor-old',
        dfxDir: 'workspaces/ancestor',
        nodeModulesLocation: 'workspaces/ancestor/canisters/old',
        method: 'getAzleVersionFromAncestorOld'
    },
    {
        name: 'descendant_different',
        packageSuffix: 'descendant-different',
        dfxDir: 'workspaces/descendant_different/dfx',
        nodeModulesLocation: 'workspaces/descendant_different',
        method: 'getAzleVersionFromDescendantDifferent'
    },
    {
        name: 'descendant_same',
        packageSuffix: 'descendant-same',
        dfxDir: 'workspaces/descendant_same/src',
        nodeModulesLocation: 'workspaces/descendant_same',
        method: 'getAzleVersionFromDescendantSame'
    },
    {
        name: 'sibling',
        packageSuffix: 'sibling',
        dfxDir: 'workspaces/siblings',
        nodeModulesLocation: 'workspaces/siblings',
        method: 'getAzleVersionFromSibling'
    },
    {
        name: 'w_ancestor_current',
        packageSuffix: 'w-ancestor-current',
        dfxDir: 'workspaces/w_ancestor',
        nodeModulesLocation: 'workspaces/w_ancestor',
        method: 'getAzleVersionFromWAncestorCurrent'
    },
    {
        name: 'w_ancestor_old',
        packageSuffix: 'w-ancestor-old',
        dfxDir: 'workspaces/w_ancestor',
        nodeModulesLocation: 'workspaces/w_ancestor/canisters/old',
        method: 'getAzleVersionFromWAncestorOld'
    },
    {
        name: 'w_descendant_different',
        packageSuffix: 'w-descendant',
        dfxDir: 'workspaces/w_descendant/canisters/different/dfx',
        nodeModulesLocation: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantDifferent'
    },
    {
        name: 'w_descendant_different_deep',
        packageSuffix: 'w-descendant',
        dfxDir: 'workspaces/w_descendant/canisters/different_deep/dfx/deeper',
        nodeModulesLocation: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantDifferentDeep'
    },
    {
        name: 'w_descendant_same',
        packageSuffix: 'w-descendant',
        dfxDir: 'workspaces/w_descendant/canisters/same/src',
        nodeModulesLocation: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantSame'
    },
    {
        name: 'w_descendant_same_deep',
        packageSuffix: 'w-descendant',
        dfxDir: 'workspaces/w_descendant/canisters/same_deep/src/dfx',
        nodeModulesLocation: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantSameDeep'
    },
    {
        name: 'w_sibling',
        packageSuffix: 'w-sibling',
        dfxDir: 'workspaces/w_siblings/w_sibling',
        nodeModulesLocation: 'workspaces/w_siblings',
        method: 'getAzleVersionFromWSibling'
    }
].filter((canister) => canister.name === 'w_sibling');
