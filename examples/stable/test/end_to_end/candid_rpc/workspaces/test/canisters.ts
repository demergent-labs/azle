type Canister = {
    name: string;
    packageSuffix: string;
    dfxRoot: string;
    projectRoot: string;
    workspaceRoot?: string;
    method: string;
};

export const CANISTERS: Canister[] = [
    {
        name: 'ancestor_current',
        packageSuffix: 'ancestor-current',
        dfxRoot: 'workspaces/ancestor',
        projectRoot: 'workspaces/ancestor/canisters/current',
        method: 'getAzleVersionFromAncestorCurrent'
    },
    {
        name: 'ancestor_old',
        packageSuffix: 'ancestor-old',
        dfxRoot: 'workspaces/ancestor',
        projectRoot: 'workspaces/ancestor/canisters/old',
        method: 'getAzleVersionFromAncestorOld'
    },
    {
        name: 'descendant_different',
        packageSuffix: 'descendant-different',
        dfxRoot: 'workspaces/descendant_different/dfx',
        projectRoot: 'workspaces/descendant_different',
        method: 'getAzleVersionFromDescendantDifferent'
    },
    {
        name: 'descendant_same',
        packageSuffix: 'descendant-same',
        dfxRoot: 'workspaces/descendant_same/src',
        projectRoot: 'workspaces/descendant_same',
        method: 'getAzleVersionFromDescendantSame'
    },
    {
        name: 'sibling',
        packageSuffix: 'sibling',
        dfxRoot: 'workspaces/siblings',
        projectRoot: 'workspaces/siblings',
        method: 'getAzleVersionFromSibling'
    },
    {
        name: 'w_ancestor_current',
        packageSuffix: 'w-ancestor-current',
        dfxRoot: 'workspaces/w_ancestor',
        projectRoot: 'workspaces/w_ancestor/canisters/current',
        workspaceRoot: 'workspaces/w_ancestor',
        method: 'getAzleVersionFromWAncestorCurrent'
    },
    {
        name: 'w_ancestor_old',
        packageSuffix: 'w-ancestor-old',
        dfxRoot: 'workspaces/w_ancestor',
        projectRoot: 'workspaces/w_ancestor/canisters/old',
        workspaceRoot: 'workspaces/w_ancestor',
        method: 'getAzleVersionFromWAncestorOld'
    },
    {
        name: 'w_descendant_different',
        packageSuffix: 'w-descendant',
        dfxRoot: 'workspaces/w_descendant/canisters/different/dfx',
        projectRoot: 'workspaces/w_descendant/canisters/different',
        workspaceRoot: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantDifferent'
    },
    {
        name: 'w_descendant_different_deep',
        packageSuffix: 'w-descendant',
        dfxRoot: 'workspaces/w_descendant/canisters/different_deep/dfx/deeper',
        projectRoot: 'workspaces/w_descendant/canisters/different_deep',
        workspaceRoot: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantDifferentDeep'
    },
    {
        name: 'w_descendant_same',
        packageSuffix: 'w-descendant',
        dfxRoot: 'workspaces/w_descendant/canisters/same/src',
        projectRoot: 'workspaces/w_descendant/canisters/same',
        workspaceRoot: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantSame'
    },
    {
        name: 'w_descendant_same_deep',
        packageSuffix: 'w-descendant',
        dfxRoot: 'workspaces/w_descendant/canisters/same_deep/src/dfx',
        projectRoot: 'workspaces/w_descendant/canisters/same_deep',
        workspaceRoot: 'workspaces/w_descendant',
        method: 'getAzleVersionFromWDescendantSameDeep'
    },
    {
        name: 'w_sibling',
        packageSuffix: 'w-sibling',
        dfxRoot: 'workspaces/w_siblings/w_sibling',
        projectRoot: 'workspaces/w_siblings/w_sibling',
        workspaceRoot: 'workspaces/w_siblings',
        method: 'getAzleVersionFromWSibling'
    }
];
