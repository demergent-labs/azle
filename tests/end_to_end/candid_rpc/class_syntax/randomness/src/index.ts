import { IDL, postUpgrade, query, update } from 'azle';

export default class {
    redeployed = false;

    @postUpgrade([])
    postUpgrade(): void {
        this.redeployed = true;
    }

    @query([], IDL.Bool)
    getRedeployed(): boolean {
        return this.redeployed;
    }

    @update([], IDL.Float64)
    randomNumber(): number {
        return Math.random();
    }
}
