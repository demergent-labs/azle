import { IDL, postUpgrade, query, update } from 'azle';

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
