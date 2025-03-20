type Canister = {
    name: string;
    path: string;
    method: string;
    result: string;
};

export const CANISTERS: Canister[] = [
    {
        name: 'ancestor_current',
        path: 'workspaces/ancestor',
        method: 'getAzleVersionFromAncestorCurrent',
        result: '0.30.0'
    },
    {
        name: 'ancestor_old',
        path: 'workspaces/ancestor',
        method: 'getAzleVersionFromAncestorOld',
        result: '0.29.0'
    },
    {
        name: 'descendant_different',
        path: 'workspaces/descendant_different/dfx',
        method: 'getAzleVersionFromDescendantDifferent',
        result: '0.30.0'
    },
    {
        name: 'descendant_same',
        path: 'workspaces/descendant_same/src',
        method: 'getAzleVersionFromDescendantSame',
        result: '0.30.0'
    },
    {
        name: 'sibling',
        path: 'workspaces/siblings',
        method: 'getAzleVersionFromSibling',
        result: '0.30.0'
    },
    {
        name: 'w_ancestor_current',
        path: 'workspaces/w_ancestor',
        method: 'getAzleVersionFromWAncestorCurrent',
        result: '0.30.0'
    },
    {
        name: 'w_ancestor_old',
        path: 'workspaces/w_ancestor',
        method: 'getAzleVersionFromWAncestorOld',
        result: '0.29.0'
    },
    {
        name: 'w_descendant_different',
        path: 'workspaces/w_descendant/canisters/different/dfx',
        method: 'getAzleVersionFromWDescendantDifferent',
        result: '0.30.0'
    },
    {
        name: 'w_descendant_different_deep',
        path: 'workspaces/w_descendant/canisters/different_deep/dfx/deeper',
        method: 'getAzleVersionFromWDescendantDifferentDeep',
        result: '0.30.0'
    },
    {
        name: 'w_descendant_same',
        path: 'workspaces/w_descendant/canisters/same/src',
        method: 'getAzleVersionFromWDescendantSame',
        result: '0.30.0'
    },
    {
        name: 'w_descendant_same_deep',
        path: 'workspaces/w_descendant/canisters/same_deep/src/dfx',
        method: 'getAzleVersionFromWDescendantSameDeep',
        result: '0.30.0'
    },
    {
        name: 'w_sibling',
        path: 'workspaces/w_siblings/w_sibling',
        method: 'getAzleVersionFromWSibling',
        result: '0.30.0'
    }
];
