import { Agent } from '@dfinity/agent';
import { createAuthenticatedAgentSync, getPrincipal } from 'azle/dfx';
import { runPropTests } from 'azle/property_tests';
import { CandidReturnTypeArb } from 'azle/property_tests/arbitraries/candid/candid_return_type_arb';
import { CandidValueAndMetaArb } from 'azle/property_tests/arbitraries/candid/candid_value_and_meta_arb';
import {
    CanisterArb,
    CanisterConfig
} from 'azle/property_tests/arbitraries/canister_arb';
import { InspectMessageMethodArb } from 'azle/property_tests/arbitraries/canister_methods/inspect_message_method_arb';
import { UpdateMethodArb } from 'azle/property_tests/arbitraries/canister_methods/update_method_arb';
import fc from 'fast-check';
import { v4 } from 'uuid';

import { CorrespondingJSType } from '../../../../arbitraries/candid/corresponding_js_type';
import { generateTests } from './generate_tests';

export type InspectMessageBehavior = 'ACCEPT' | 'RETURN' | 'THROW';

const AZLE_ACCEPT_IDENTITY_NAME = `_prop_test_azle_accept_identity_${v4()}`;
const AZLE_RETURN_IDENTITY_NAME = `_prop_test_azle_return_identity_${v4()}`;
const AZLE_THROW_IDENTITY_NAME = `_prop_test_azle_throw_identity_${v4()}`;

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
        generateTests: () => []
    });

    const HeterogeneousUpdateMethodArb = UpdateMethodArb(
        fc.array(CandidValueAndMetaArb()),
        CandidReturnTypeArb(),
        {
            generateBody: (_, returnType) =>
                `return ${returnType.src.valueLiteral}`,
            generateTests: (...args) => generateTests(...args, agents)
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

runPropTests(CanisterArb(CanisterConfigArb()));

function generateInspectMessageMethodBody(): string {
    const acceptPrincipal = getPrincipal(AZLE_ACCEPT_IDENTITY_NAME);
    const returnPrincipal = getPrincipal(AZLE_RETURN_IDENTITY_NAME);
    const throwPrincipal = getPrincipal(AZLE_THROW_IDENTITY_NAME);
    return `
        if (ic.caller().toText() === "${acceptPrincipal}") {
            ic.acceptMessage();
            return;
        }
        if (ic.caller().toText() === "${returnPrincipal}") {
            return;
        }
        if (ic.caller().toText() === "${throwPrincipal}") {
            throw new Error(\`Method "$\{ic.methodName()}" not allowed\`);
        }
        throw new Error("Unexpected caller");
    `;
}
