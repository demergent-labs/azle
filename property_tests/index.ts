import fc from 'fast-check';
import { Test } from 'azle/test';

// TODO Canister
// TODO Record
// TODO text
// TODO nat

// TODO query methods
// TODO update methods

const actor = {} as any;

const JsFunctionNameArb = fc.stringMatching(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/);

// TODO methodName must be a valid JS name
// TODO methodName must be unique
const QueryMethodArb = fc
    .tuple(JsFunctionNameArb, fc.nat())
    .map(([jsFunctionName, nat]) => {
        return {
            name: jsFunctionName,
            sourceCode: `${jsFunctionName}: query([], nat, () => ${nat})`,
            expectedResult: nat
        };
    });

const CanisterArb = fc.constant(0).map(() => {
    const queryMethods = fc.sample(QueryMethodArb, 10);

    const queryMethodSourceCodes = queryMethods.map(
        (queryMethod) => queryMethod.sourceCode
    );

    const tests: Test[] = queryMethods.map((queryMethod) => {
        return {
            name: `query method test ${queryMethod.name}`,
            test: async () => {
                const result = await actor[queryMethod.name]();

                return result === queryMethod.expectedResult;
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
    fc.property(CanisterArb, (arbitraryCanister) => {
        console.log(arbitraryCanister);
        return true;
    }),
    {
        numRuns: 10
    }
);
