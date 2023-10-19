import fc from 'fast-check';
import { createQueryMethodArb } from './query_method_arb';
import { Test, getCanisterId } from 'azle/test';

export function createCanisterArb(testName: string) {
    return fc.constant(0).map(() => {
        const queryMethods = fc.sample(createQueryMethodArb(), 100);

        const queryMethodSourceCodes = queryMethods.map(
            (queryMethod) => queryMethod.sourceCode
        );

        const tests: Test[] = queryMethods.map((queryMethod) => {
            return {
                name: `query method test ${queryMethod.name}`,
                test: async () => {
                    const { createActor } = await import(
                        `../tests/${testName}/test/dfx_generated/canister`
                    );

                    const actor: any = createActor(getCanisterId('canister'), {
                        agentOptions: {
                            host: 'http://127.0.0.1:8000'
                        }
                    });

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
}
