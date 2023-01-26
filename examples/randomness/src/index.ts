import { Update, float64 } from 'azle';

export function math_random(): Update<float64> {
    return Math.random();
}
