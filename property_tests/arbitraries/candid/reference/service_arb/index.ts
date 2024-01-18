import fc from 'fast-check';
import { Principal } from '@dfinity/principal';

import { candidDefinitionArb } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import {
    CandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { ServiceValueArb } from './values_arb';
import { ServiceDefinitionArb } from './definition_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

// TODO:
// - services that are more than type-definitions, i.e. have functionality
// - async service methods
// - non-query methods
// - actually using the service

// Example Service:
// const SomeService = Canister({
//     method1: query([], Void),
//     method2: query([text, text, nat64], nat64),
// });

export function ServiceArb(
    innerCandidDefinitionArb: WithShapesArb<CandidDefinition> = candidDefinitionArb(
        {}
    )
): fc.Arbitrary<CandidValueAndMeta<Principal>> {
    return CandidValueAndMetaArbGenerator(
        ServiceDefinitionArb(innerCandidDefinitionArb),
        ServiceValueArb
    );
}
