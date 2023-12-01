import { execSync } from 'child_process';
import fc from 'fast-check';
import { writeFileSync } from 'fs';

import { getCanisterId, runTests, Test } from '../../../../test';
import { getActor } from '../../../get_actor';

// TODO Canister
// TODO Record
// TODO text
// TODO nat

// TODO query methods
// TODO update methods

// const JsFunctionNameArb = fc.stringMatching(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/);
const JsFunctionNameArb = fc.stringMatching(/^[_a-zA-Z][_a-zA-Z0-9]*$/);

let generatedStrings = new Set();

const UniqueJsFunctionNameArb = JsFunctionNameArb.filter(
    (str) => !generatedStrings.has(str)
).map((str) => {
    generatedStrings.add(str);
    return str;
});

// TODO methodName must be a valid JS name
// TODO methodName must be unique
const QueryMethodArb = fc
    .tuple(UniqueJsFunctionNameArb, fc.nat())
    .map(([jsFunctionName, nat]) => {
        const normalizedJsFunctionName =
            jsFunctionName === '_' ? '_x' : jsFunctionName;

        return {
            name: normalizedJsFunctionName,
            sourceCode: `${normalizedJsFunctionName}: query([], nat, () => ${nat}n)`,
            expectedResult: BigInt(nat)
        };
    });

const CanisterArb = fc.constant(0).map(() => {
    const queryMethods = fc.sample(QueryMethodArb, 100);

    const queryMethodSourceCodes = queryMethods.map(
        (queryMethod) => queryMethod.sourceCode
    );

    const tests: Test[] = queryMethods.map((queryMethod) => {
        return {
            name: `query method test ${queryMethod.name}`,
            test: async () => {
                const actor = getActor('./tests/query_methods/test');

                const result = await actor[queryMethod.name]();

                return {
                    Ok: result === queryMethod.expectedResult
                };
            }
        };
    });

    return {
        sourceCode: `
import { Canister, nat, query } from 'azle';

export default Canister({
    ${queryMethodSourceCodes.join(',\n    ')}
});`,
        tests
    };
});

fc.assert(
    fc.asyncProperty(CanisterArb, async (canister) => {
        writeFileSync('src/index.ts', canister.sourceCode);

        execSync(`dfx canister uninstall-code canister || true`, {
            stdio: 'inherit'
        });

        execSync(`dfx deploy canister`, {
            stdio: 'inherit'
        });

        execSync(`dfx generate canister`, {
            stdio: 'inherit'
        });

        await runTests(canister.tests);

        return true;
    }),
    {
        numRuns: 1
    }
);
