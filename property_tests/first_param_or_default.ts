import fc from 'fast-check';

import { CandidMeta } from './arbitraries/candid/candid_arb';
import { CandidType } from './arbitraries/candid/candid_type_arb';
import { CandidReturnType } from './arbitraries/candid/candid_return_type_arb';

/**
 * Returns two arbs: the first arb given, and then either that same arb if the
 * list of samples generated from that first arb is of non-zero length,
 * otherwise the default return arb.
 * @param paramsArb the arb of the parameter types
 * @param defaultReturnArb the default return arb type
 * @returns the two arbs
 */
export function firstParamOrDefault<
    ParamType extends CandidType,
    ReturnType extends CandidReturnType
>(
    paramsArb: fc.Arbitrary<CandidMeta<ParamType>>,
    defaultReturnArb: fc.Arbitrary<CandidMeta<ReturnType>>
) {
    const newComplexType = fc
        .tuple(fc.array(paramsArb), defaultReturnArb)
        .chain(([params, defaultReturnType]) => {
            const paramTypeArb = fc.constant(params);

            const returnType: CandidMeta<ParamType | ReturnType> =
                params.length === 0 ? defaultReturnType : params[0];

            const returnTypeArb = fc.constant(returnType);

            const complexArb: fc.Arbitrary<
                [CandidMeta<ParamType>[], CandidMeta<ParamType | ReturnType>]
            > = fc.tuple(paramTypeArb, returnTypeArb);

            return complexArb;
        });

    const [params, returnType] = fc.sample(newComplexType, 1)[0];

    return [fc.constant(params), fc.constant(returnType)] as [
        fc.Arbitrary<CandidMeta<ParamType>[]>,
        fc.Arbitrary<CandidMeta<ReturnType>>
    ];
}
