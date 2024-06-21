import {
    bool,
    Canister,
    float64,
    postUpgrade,
    query,
    update
} from 'azle/experimental';

let redeployed = false;

export default class {
    @postUpgrade([])
    postUpgrade() {
        redeployed = true;
    }
    @query([], bool)
    getRedeployed() {
        return redeployed;
    }
    @update([], float64)
    randomNumber() {
        return Math.random();
    }
}
