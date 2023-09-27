import { bool, float64, postUpgrade, query, Service, update } from 'azle';

let redeployed = false;

export default Service({
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
