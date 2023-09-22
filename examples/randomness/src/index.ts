import { float64, Service, update } from 'azle';

export default Service({
    randomNumber: update([], float64, () => {
        return Math.random();
    })
});
