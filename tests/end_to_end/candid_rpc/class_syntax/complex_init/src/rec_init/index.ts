import {

    init,
    nat,
    Null,
    query,
    Recursive,
    Variant
} from 'azle/experimental';

const Node = Recursive(() =>
    Variant({
        Leaf: Null,
        Branch: Node
    })
);

let tree: typeof Node = { Leaf: null };

export default class {
@init([Node])
    init(node){
        tree = node;
        return undefined;
    }),
@query([], nat)
    countBranches(){
        return countBranches(tree);
    })
}

function countBranches(node: typeof Node): nat {
    if (node.Leaf !== undefined) {
        return 1n;
    }
    return countBranches(node.Branch);
}
