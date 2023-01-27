import { float64, Update } from 'azle';

export function random_number(): Update<float64> {
    return Math.random();
}
