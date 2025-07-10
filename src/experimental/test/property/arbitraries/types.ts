import '#experimental/build/assert_experimental';

import { PrimitiveDefinitionWeights } from './candid/candid_definition_arb/simple_candid_definition_arb';
import { DefinitionConstraints } from './candid/candid_definition_arb/types';
import { Float32Constraints } from './candid/primitive/floats/float32_arb';
import { Float64Constraints } from './candid/primitive/floats/float64_arb';
import { TextConstraints } from './candid/primitive/text_arb';
import { QueryOrUpdateConstraints } from './canister_methods';

type NoConstraints = Record<string, never>;

type Constraints =
    | NoConstraints
    | DefinitionConstraints
    | PrimitiveDefinitionWeights
    | Float32Constraints
    | Float64Constraints
    | TextConstraints
    | QueryOrUpdateConstraints;

export type Context<Constraint extends Constraints = Record<string, never>> = {
    constraints: Constraint;
    inspectMessageImportHack?: boolean;
};
