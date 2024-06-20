import {
    bool,
    Canister,
    float64,
    postUpgrade,
    query,
    update
} from 'azle/experimental';

let redeployed = false;

export default Canister({
    postUpgrade: postUpgrade([], () => {
        redeployed = true;
    }),
    getRedeployed: query([], bool, () => {
        return redeployed;
    }),
    randomNumber: update([], float64, () => {
        return Math.random();
    })
});
