import fc from 'fast-check';

export const Float64Arb = fc
    .float64Array({ maxLength: 1, minLength: 1 })
    .map((floats) => floats[0]);
