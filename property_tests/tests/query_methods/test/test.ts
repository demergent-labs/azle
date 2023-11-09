import fc from 'fast-check';
import { Test } from '../../../../test';

import { getActor, runPropTests } from '../../../';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';
import {
    CandidType,
    CandidTypeArb
} from '../../../arbitraries/candid/candid_type_arb';
import { VoidArb } from '../../../arbitraries/candid/primitive/void';
import { CanisterArb } from '../../../arbitraries/canister_arb';
import { QueryMethodArb } from '../../../arbitraries/query_method_arb';

// TODO Canister
// TODO Record
// TODO text
// TODO nat
// TODO update methods

const HeterogeneousQueryMethod = QueryMethodArb(
    fc.array(CandidTypeArb, { minLength: 1 }), // TODO: I set to 1 for ease. Support 0.
    fc.oneof(CandidTypeArb, VoidArb), // TODO: Consider adjusting the weights so Void is used same as all others
    {
        generateBody,
        generateTests
    }
);

runPropTests(CanisterArb(HeterogeneousQueryMethod));

function generateBody(
    paramNames: string[],
    params: CandidMeta<CandidType>[],
    returnType: CandidMeta<CandidType>
): string {
    return '';
}

function generateTests(
    functionName: string,
    params: CandidMeta<CandidType>[],
    returnType: CandidMeta<CandidType>
): Test[] {
    return [
        {
            name: `query method ${functionName}`,
            test: async () => {
                const actor = getActor('./tests/query_methods/test');

                await actor[functionName](
                    ...params.map((param) => param.value)
                );

                throw new Error('TODO: Test not implemented');
            }
        }
    ];
}
