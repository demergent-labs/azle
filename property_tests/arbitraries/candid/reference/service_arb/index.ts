import { Principal } from '@dfinity/principal';
import fc from 'fast-check';

import { Api } from '../../../types';
import { candidDefinitionArb } from '../../candid_definition_arb';
import {
    CandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { ClassServiceValueArb } from './class_values_arb';
import { ServiceDefinitionArb } from './definition_arb';
import { FunctionalServiceValueArb } from './functional_values_arb';

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
    api: Api,
    innerCandidDefinitionArb: WithShapesArb<CandidDefinition> = candidDefinitionArb(
        {},
        undefined,
        api
    )
): fc.Arbitrary<CandidValueAndMeta<Principal>> {
    return CandidValueAndMetaArbGenerator(
        ServiceDefinitionArb(innerCandidDefinitionArb, api),
        api === 'functional' ? FunctionalServiceValueArb : ClassServiceValueArb
    );
}
