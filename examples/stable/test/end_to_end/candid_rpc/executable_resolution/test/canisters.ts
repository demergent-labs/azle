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
        name: 'ancestor_multi_version_one',
        packageSuffix: 'ancestor-multi-version-one',
        dfxRoot: 'projects/ancestor',
        projectRoot: 'projects/ancestor/canisters/multi_version_one',
        method: 'getAzleVersionFromAncestorMultiVersionOne'
    },
    {
        name: 'ancestor_multi_version_two',
        packageSuffix: 'ancestor-multi-version-two',
        dfxRoot: 'projects/ancestor',
        projectRoot: 'projects/ancestor/canisters/multi_version_two',
        method: 'getAzleVersionFromAncestorMultiVersionTwo'
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
        name: 'descendant_different_deep',
        packageSuffix: 'descendant-different-deep',
        dfxRoot: 'projects/descendant_different_deep/dfx/deeper',
        projectRoot: 'projects/descendant_different_deep',
        method: 'getAzleVersionFromDescendantDifferentDeep'
    },
    {
        name: 'descendant_same_deep',
        packageSuffix: 'descendant-same-deep',
        dfxRoot: 'projects/descendant_same_deep/src/deeper',
        projectRoot: 'projects/descendant_same_deep',
        method: 'getAzleVersionFromDescendantSameDeep'
    },
    {
        name: 'siblings',
        packageSuffix: 'siblings',
        dfxRoot: 'projects/siblings',
        projectRoot: 'projects/siblings',
        method: 'getAzleVersionFromSibling'
    },
    {
        name: 'w_ancestor_multi_version_one',
        packageSuffix: 'w-ancestor-multi-version-one',
        dfxRoot: 'projects/w_ancestor',
        projectRoot: 'projects/w_ancestor/canisters/multi_version_one',
        workspaceRoot: 'projects/w_ancestor',
        method: 'getAzleVersionFromWAncestorMultiVersionOne'
    },
    {
        name: 'w_ancestor_multi_version_two',
        packageSuffix: 'w-ancestor-multi-version-two',
        dfxRoot: 'projects/w_ancestor',
        projectRoot: 'projects/w_ancestor/canisters/multi_version_two',
        workspaceRoot: 'projects/w_ancestor',
        method: 'getAzleVersionFromWAncestorMultiVersionTwo'
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
