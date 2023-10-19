import fc from 'fast-check';
import { createUniquePrimitiveArb } from './unique_primitive_arb';
import { JsFunctionNameArb } from './js_function_name_arb';

export function createQueryMethodArb() {
    return fc
        .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.nat())
        .map(([jsFunctionName, nat]) => {
            return {
                name: jsFunctionName,
                sourceCode: `${jsFunctionName}: query([], nat, () => ${nat}n)`,
                expectedResult: BigInt(nat)
            };
        });
}
