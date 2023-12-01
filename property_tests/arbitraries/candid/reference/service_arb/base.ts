import fc from 'fast-check';
import { Principal } from '@dfinity/principal';

import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { CandidDefinition } from '../../definition_arb/types';
import { ServiceValueArb } from './values_arb';
import { ServiceDefinitionArb } from './definition_arb';
import { ComplexCandidValueAndMetaArb } from '../../complex_type_arb';

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
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Principal>> {
    return ComplexCandidValueAndMetaArb(
        ServiceDefinitionArb(candidDefinitionArb),
        ServiceValueArb
    );
}
