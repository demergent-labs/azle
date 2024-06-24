import { IDL, init, query, update } from 'azle';

const Node = Recursive(() =>
    Variant({
        Leaf: Null,
        Branch: Node
    })
);

let tree: typeof Node = { Leaf: null };

export default class {
    @init([Node])
    init(node) {
        tree = node;
        return undefined;
    }
    @query([], IDL.Nat)
    countBranches() {
        return countBranches(tree);
    }
}

function countBranches(node: typeof Node): bigint {
    if (node.Leaf !== undefined) {
        return 1n;
    }
    return countBranches(node.Branch);
}
