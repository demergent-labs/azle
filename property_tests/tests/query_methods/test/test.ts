import { execSync } from 'child_process';
import fc from 'fast-check';
import { writeFileSync } from 'fs';
import { Test, getCanisterId, runTests } from '../../../../test';

import { CanisterArb } from '../../../arbitraries/canister_arb';
import { getActor, runPropTests } from '../../../';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { QueryMethodBlueprint } from '../../../arbitraries/test_sample_arb';
import {
    CandidType,
    CandidTypeArb
} from '../../../arbitraries/candid/candid_type_arb';
import { VoidArb } from '../../../arbitraries/candid/primitive/void';
import { CandidMeta } from '../../../arbitraries/candid/candid_arb';

// TODO Canister
// TODO Record
// TODO text
// TODO nat
// TODO update methods

const QueryMethodTestArb = fc
    .tuple(
        createUniquePrimitiveArb(JsFunctionNameArb),
        fc.array(CandidTypeArb, { minLength: 1 }), // TODO: I set to 1 for ease. Support 0.
        fc.oneof(CandidTypeArb, VoidArb) // TODO: Consider adjusting the weights so Void is used same as all others
    )
    .map(
        ([
            functionName,
            paramTypes,
            defaultReturnType
        ]): QueryMethodBlueprint => {
            const imports = new Set([
                'Principal',
                ...paramTypes.flatMap((type) => [...type.src.imports]),
                ...defaultReturnType.src.imports
            ]);
            const paramNames = paramTypes.map((_, index) => `param${index}`);
            const paramCandidTypes = paramTypes
                .map((text) => text.src.candidType)
                .join(', ');

            const returnCandidType = defaultReturnType.src.candidType;

            const body = 'return param0;';

            const tests: Test[] = [
                {
                    name: `query method test ${functionName}`,
                    test: async () => {
                        const actor = getActor('./tests/query_methods/test');

                        const result = await actor[functionName]();

                        return {
                            Ok: result === queryMethod.expectedResult
                        };
                    }
                }
            ];

            return {
                imports,
                functionName,
                paramNames,
                paramCandidTypes,
                returnCandidType,
                body,
                tests
            };
        }
    );

runPropTests(CanisterArb(QueryMethodTestArb));
