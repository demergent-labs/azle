import {
    Query,
    Update,
    int32
} from 'azle';

// TODO start using principals instead of strings for ids
type State = {
    balances: {
        [id: string]: int32
    }
};

let state: State = {
    balances: {
        '0': 100
    }
};

export function transfer(
    from: string,
    to: string,
    amount: int32
): Update<int32> {
    const fromBalance: int32 = state.balances[from] ?? 0;

    if (fromBalance < amount) {
        return 0;
    }

    state.balances[from] -= amount;
    state.balances[to] += amount;

    return amount;
}

export function balance(id: string): Query<int32> {
    return state.balances[id] ?? 0;
}