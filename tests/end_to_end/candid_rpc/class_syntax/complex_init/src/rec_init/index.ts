import { IDL, init, query } from 'azle';

const Node = IDL.Rec();

Node.fill(
    IDL.Variant({
        Leaf: IDL.Null,
        Branch: Node
    })
);

type Node = { Leaf: null } | { Branch: Node };

let tree: Node = { Leaf: null };

export default class {
    @init([Node])
    init(node: Node) {
        tree = node;
        return undefined;
    }
    @query([], IDL.Nat)
    countBranches() {
        return countBranches(tree);
    }
}

function countBranches(node: Node): bigint {
    if ('Leaf' in node) {
        return 1n;
    }
    return countBranches(node.Branch);
}
