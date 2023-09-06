import { float64, Service, update } from 'azle';

export default class extends Service {
    @update([], float64)
    randomNumber(): float64 {
        return Math.random();
    }
}
