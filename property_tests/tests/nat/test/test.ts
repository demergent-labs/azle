import fc from 'fast-check';
import { runTests } from 'azle/test';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { createCanisterArb } from '../../../arbitraries/canister_arb';
import { NatArb } from '../../../arbitraries/candid/primitive/nats/nat_arb';
import { getCanisterId } from '../../../../test';
import { createUniquePrimitiveArb } from '../../../arbitraries/unique_primitive_arb';
import { JsFunctionNameArb } from '../../../arbitraries/js_function_name_arb';

const NatTestArb = fc
    .tuple(createUniquePrimitiveArb(JsFunctionNameArb), fc.array(NatArb))
    .map(([functionName, nats]) => {
        const paramCandidTypes = nats.map(() => 'nat').join(', ');
        const paramNames = nats.map((_, index) => `param${index}`);

        const paramsAreBigInts = paramNames
            .map((paramName) => {
                return `if (typeof ${paramName} !== 'bigint') throw new Error('${paramName} must be a bigint');`;
            })
            .join('\n');

        const paramsSum = paramNames.reduce((acc, paramName) => {
            return `${acc} + ${paramName}`;
        }, '0n');

        const returnStatement = `${paramsSum}`;

        const expectedResult = nats.reduce((acc, nat) => acc + nat, 0n);

        const paramSamples = nats;

        return {
            functionName,
            paramCandidTypes,
            paramNames,
            paramSamples,
            body: `
            ${paramsAreBigInts}

            return ${returnStatement};
        `,
            test: {
                name: '',
                test: async () => {
                    const { createActor } = await import(
                        `./dfx_generated/canister`
                    );

                    const actor: any = createActor(getCanisterId('canister'), {
                        agentOptions: {
                            host: 'http://127.0.0.1:8000'
                        }
                    });

                    const result = await actor[functionName](...nats);

                    return {
                        Ok: result === expectedResult
                    };
                }
            }
        };
    });

fc.assert(
    fc.asyncProperty(createCanisterArb(NatTestArb), async (canister) => {
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
