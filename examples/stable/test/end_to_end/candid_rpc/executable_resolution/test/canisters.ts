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
        dfxRoot: 'projects/ancestor',
        projectRoot: 'projects/ancestor/canisters/current',
        method: 'getAzleVersionFromAncestorCurrent'
    },
    {
        name: 'ancestor_old',
        packageSuffix: 'ancestor-old',
        dfxRoot: 'projects/ancestor',
        projectRoot: 'projects/ancestor/canisters/old',
        method: 'getAzleVersionFromAncestorOld'
    },
    {
        name: 'descendant_different',
        packageSuffix: 'descendant-different',
        dfxRoot: 'projects/descendant_different/dfx',
        projectRoot: 'projects/descendant_different',
        method: 'getAzleVersionFromDescendantDifferent'
    },
    {
        name: 'descendant_same',
        packageSuffix: 'descendant-same',
        dfxRoot: 'projects/descendant_same/src',
        projectRoot: 'projects/descendant_same',
        method: 'getAzleVersionFromDescendantSame'
    },
    {
        name: 'siblings',
        packageSuffix: 'siblings',
        dfxRoot: 'projects/siblings',
        projectRoot: 'projects/siblings',
        method: 'getAzleVersionFromSibling'
    },
    {
        name: 'w_ancestor_current',
        packageSuffix: 'w-ancestor-current',
        dfxRoot: 'projects/w_ancestor',
        projectRoot: 'projects/w_ancestor/canisters/current',
        workspaceRoot: 'projects/w_ancestor',
        method: 'getAzleVersionFromWAncestorCurrent'
    },
    {
        name: 'w_ancestor_old',
        packageSuffix: 'w-ancestor-old',
        dfxRoot: 'projects/w_ancestor',
        projectRoot: 'projects/w_ancestor/canisters/old',
        workspaceRoot: 'projects/w_ancestor',
        method: 'getAzleVersionFromWAncestorOld'
    },
    {
        name: 'w_descendant_different',
        packageSuffix: 'w-descendant',
        dfxRoot: 'projects/w_descendant/canisters/different/dfx',
        projectRoot: 'projects/w_descendant/canisters/different',
        workspaceRoot: 'projects/w_descendant',
        method: 'getAzleVersionFromWDescendantDifferent'
    },
    {
        name: 'w_descendant_different_deep',
        packageSuffix: 'w-descendant',
        dfxRoot: 'projects/w_descendant/canisters/different_deep/dfx/deeper',
        projectRoot: 'projects/w_descendant/canisters/different_deep',
        workspaceRoot: 'projects/w_descendant',
        method: 'getAzleVersionFromWDescendantDifferentDeep'
    },
    {
        name: 'w_descendant_same',
        packageSuffix: 'w-descendant',
        dfxRoot: 'projects/w_descendant/canisters/same/src',
        projectRoot: 'projects/w_descendant/canisters/same',
        workspaceRoot: 'projects/w_descendant',
        method: 'getAzleVersionFromWDescendantSame'
    },
    {
        name: 'w_descendant_same_deep',
        packageSuffix: 'w-descendant',
        dfxRoot: 'projects/w_descendant/canisters/same_deep/src/dfx',
        projectRoot: 'projects/w_descendant/canisters/same_deep',
        workspaceRoot: 'projects/w_descendant',
        method: 'getAzleVersionFromWDescendantSameDeep'
    },
    {
        name: 'w_siblings',
        packageSuffix: 'w-siblings',
        dfxRoot: 'projects/w_siblings/w_siblings',
        projectRoot: 'projects/w_siblings/w_siblings',
        workspaceRoot: 'projects/w_siblings',
        method: 'getAzleVersionFromWSiblings'
    }
];
