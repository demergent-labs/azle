import { Agent } from '@dfinity/agent';
import { createAuthenticatedAgentSync, getPrincipal } from 'azle/dfx';
import { runPropTests } from 'azle/property_tests';
import { CandidReturnTypeArb } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import { CorrespondingJSType } from 'azle/property_tests/arbitraries/candid/corresponding_js_type';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { InspectMessageMethodArb } from 'azle/property_tests/arbitraries/canister_methods/inspect_message_method_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import fc from 'fast-check';
import { v4 } from 'uuid';

import { generateTests } from './generate_tests';

export type InspectMessageBehavior = 'ACCEPT' | 'RETURN' | 'THROW';

const AZLE_ACCEPT_IDENTITY_NAME = `_prop_test_azle_accept_identity_${v4()}`;
const AZLE_RETURN_IDENTITY_NAME = `_prop_test_azle_return_identity_${v4()}`;
const AZLE_THROW_IDENTITY_NAME = `_prop_test_azle_throw_identity_${v4()}`;

const syntax = 'class';

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

    const InspectMessageArb = InspectMessageMethodArb({
        generateBody: () => generateInspectMessageMethodBody(),
        generateTests: () => [],
        syntax
    });

    const HeterogeneousUpdateMethodArb = UpdateMethodArb(
        fc.array(CandidValueAndMetaArb(syntax)),
        CandidReturnTypeArb(syntax),
        {
            generateBody: (_, returnType) =>
                `return ${returnType.src.valueLiteral}`,
            generateTests: (...args) => generateTests(...args, agents),
            syntax
        }
    );

    const small = {
        minLength: 0,
        maxLength: 20
    };

    return fc
        .tuple(InspectMessageArb, fc.array(HeterogeneousUpdateMethodArb, small))
        .map(
            ([inspectMessageMethod, updateMethods]): CanisterConfig<
                CorrespondingJSType,
                CorrespondingJSType
            > => {
                return {
                    inspectMessageMethod,
                    updateMethods
                };
            }
        );
}

runPropTests(CanisterArb(CanisterConfigArb(), syntax));

function generateInspectMessageMethodBody(): string {
    const acceptPrincipal = getPrincipal(AZLE_ACCEPT_IDENTITY_NAME);
    const returnPrincipal = getPrincipal(AZLE_RETURN_IDENTITY_NAME);
    const throwPrincipal = getPrincipal(AZLE_THROW_IDENTITY_NAME);
    return `
        if (caller().toText() === "${acceptPrincipal}") {
            acceptMessage();
            return;
        }
        if (caller().toText() === "${returnPrincipal}") {
            return;
        }
        if (caller().toText() === "${throwPrincipal}") {
            throw new Error(\`Method "$\{methodName()}" not allowed\`);
        }
        throw new Error("Unexpected caller");
    `;
}
