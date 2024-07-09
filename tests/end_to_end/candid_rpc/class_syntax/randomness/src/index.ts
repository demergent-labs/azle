import { IDL, postUpgrade, query, update } from 'azle';

let redeployed = false;

export default class {
    @postUpgrade([])
    postUpgrade(): void {
        redeployed = true;
    }

    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return redeployed;
    }

    @update([], IDL.Float64)
    randomNumber(): number {
        return Math.random();
    }
}
