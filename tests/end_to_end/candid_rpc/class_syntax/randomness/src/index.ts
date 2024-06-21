import { IDL, postUpgrade, query, update } from 'azle';

let redeployed = false;

export default class {
    @postUpgrade([])
    postUpgrade() {
        redeployed = true;
    }
    @query([], IDL.Bool)
    getRedeployed() {
        return redeployed;
    }
    @update([], float64)
    randomNumber() {
        return Math.random();
    }
}
