import 'azle/experimental/_internal/test/set_experimental';

import { Agent } from '@dfinity/agent';
import {
    createAuthenticatedAgentSync,
    getPrincipal
} from 'azle/experimental/_internal/dfx';
import { runPropTests } from 'azle/experimental/_internal/test/property';
import { CandidReturnTypeArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/experimental/_internal/test/property/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/experimental/_internal/test/property/arbitraries/candid/corresponding_js_type';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { InspectMessageMethodArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/inspect_message_method_arb';
import {
    UpdateMethod,
    UpdateMethodArb
} from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/update_method_arb';
import fc from 'fast-check';
import { v4 } from 'uuid';

import { generateTests } from './generate_tests';

export type InspectMessageBehavior = 'ACCEPT' | 'RETURN' | 'THROW';

const AZLE_ACCEPT_IDENTITY_NAME = `_prop_test_azle_accept_identity_${v4()}`;
const AZLE_RETURN_IDENTITY_NAME = `_prop_test_azle_return_identity_${v4()}`;
const AZLE_THROW_IDENTITY_NAME = `_prop_test_azle_throw_identity_${v4()}`;

const context = { constraints: {}, inspectMessageImportHack: true };

// TODO make this function's return type explicit https://github.com/demergent-labs/azle/issues/1860
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function CanisterConfigArb() {
    const agents: [Agent, InspectMessageBehavior][] = [
        [
            createAuthenticatedAgentSync(AZLE_ACCEPT_IDENTITY_NAME, true),
            'ACCEPT'
        ],
        [
            createAuthenticatedAgentSync(AZLE_RETURN_IDENTITY_NAME, true),
            'RETURN'
        ],
        [createAuthenticatedAgentSync(AZLE_THROW_IDENTITY_NAME, true), 'THROW']
    ];

    const HeterogeneousUpdateMethodArb = UpdateMethodArb(
        { constraints: {} },
        {
            generateBody: (_, returnType) =>
                `return ${returnType.src.valueLiteral}`,
            generateTests: (...args) => generateTests(...args, agents)
        },
        fc.array(
            CandidValueAndMetaArb({
                ...context,
                constraints: { depthLevel: 3, maxLength: 5 }
            }),
            {
                size: 'max',
                maxLength: 3
            }
        ),
        CandidReturnTypeArb(context)
    );

    const small = {
        minLength: 0,
        maxLength: 10
    };

    return fc
        .array(HeterogeneousUpdateMethodArb, small)
        .chain((updateMethods) => {
            const InspectMessageArb = InspectMessageMethodArb(
                {
                    constraints: {}
                },
                {
                    generateBody: () =>
                        generateInspectMessageMethodBody(updateMethods),
                    generateTests: () => []
                }
            );

            return InspectMessageArb.map(
                (
                    inspectMessage
                ): CanisterConfig<CorrespondingJSType, CorrespondingJSType> => {
                    return {
                        inspectMessageMethod: inspectMessage,
                        updateMethods
                    };
                }
            );
        });
}

runPropTests(CanisterArb(context, CanisterConfigArb()));

function escapeMethodName(methodName: string): string {
    if (methodName.startsWith('"') && methodName.endsWith('"')) {
        return `"${methodName.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }
    return `"${methodName}"`;
}

function generateInspectMessageMethodBody(
    updateMethods: UpdateMethod<CorrespondingJSType, CorrespondingJSType>[]
): string {
    const acceptPrincipal = getPrincipal(AZLE_ACCEPT_IDENTITY_NAME);
    const returnPrincipal = getPrincipal(AZLE_RETURN_IDENTITY_NAME);
    const throwPrincipal = getPrincipal(AZLE_THROW_IDENTITY_NAME);

    return `
        const expectedArgs: {
            ${updateMethods.map((updateMethod) => `${escapeMethodName(updateMethod.methodName)}: [${updateMethod.paramTypes.map((paramType) => paramType.src.typeAnnotation).join(', ')}]`).join(',\n')}
        } = {
            ${updateMethods.map((updateMethod) => `${escapeMethodName(updateMethod.methodName)}: [${updateMethod.paramTypes.map((paramType) => paramType.src.valueLiteral).join(', ')}]`).join(',\n')}
        };

        if (candidDeepEqual(args, expectedArgs[methodName as keyof typeof expectedArgs]) !== true) {
            throw new Error("Expected @inspectMessage arguments do not match");
        }

        if (msgCaller().toText() === "${acceptPrincipal}") {
            return true;
        }

        if (msgCaller().toText() === "${returnPrincipal}") {
            return false;
        }

        if (msgCaller().toText() === "${throwPrincipal}") {
            throw new Error(\`Method "$\{msgMethodName()}" not allowed\`);
        }

        throw new Error("Unexpected caller");
    `;
}
