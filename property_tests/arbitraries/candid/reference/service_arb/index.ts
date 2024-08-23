import { Principal } from '@dfinity/principal';
import fc from 'fast-check';

import { Context } from '../../../types';
import { candidDefinitionArb } from '../../candid_definition_arb';
import {
    CandidDefinition,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { ServiceDefinitionArb } from './definition_arb';
import { ServiceValueArb } from './values_arb';

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
    context: Context,
    innerCandidDefinitionArb: WithShapesArb<CandidDefinition> = candidDefinitionArb(
        context,
        {}
    )
): fc.Arbitrary<CandidValueAndMeta<Principal>> {
    return CandidValueAndMetaArbGenerator(
        context,
        ServiceDefinitionArb(context, innerCandidDefinitionArb),
        ServiceValueArb
    );
}
