import { IDL, init, query } from 'azle';

const Node = IDL.Rec();

Node.fill(
    IDL.Variant({
        Leaf: IDL.Null,
        Branch: Node
    })
);

type Node = { Leaf: null } | { Branch: Node };

export default class {
    tree: Node = { Leaf: null };

    @init([Node])
    init(node: Node): void {
        this.tree = node;
        return undefined;
    }

    @query([], IDL.Nat)
    countBranches(): bigint {
        return countBranches(this.tree);
    }
}

function countBranches(node: Node): bigint {
    if ('Leaf' in node) {
        return 1n;
    }
    return countBranches(node.Branch);
}
