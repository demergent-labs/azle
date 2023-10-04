import { Canister, init, Null, query, Recursive, Variant, nat } from 'azle';

const Node = Recursive(() =>
    Variant({
        Leaf: Null,
        Branch: Node
    })
);

let tree: typeof Node = { Leaf: null };

export default Canister({
    init: init([Node], (node) => {
        tree = node;
        return undefined;
    }),
    countBranches: query([], nat, () => {
        return countBranches(tree);
    })
});

function countBranches(node: typeof Node): nat {
    if (node.Leaf !== undefined) {
        return 1n;
    }
    return countBranches(node.Branch);
}
