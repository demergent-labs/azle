import { PrimitiveDefinitionWeights } from './candid/candid_definition_arb/simple_candid_definition_arb';
import { DefinitionConstraints } from './candid/candid_definition_arb/types';
import { Float32Constraints } from './candid/primitive/floats/float32_arb';
import { Float64Constraints } from './candid/primitive/floats/float64_arb';
import { TextConstraints } from './candid/primitive/text';
import {
    CanisterMethodConstraints,
    QueryOrUpdateConstraints
} from './canister_methods';

export type Api = 'class' | 'functional';

type NoConstraints = Record<string, never>;

type Constraints =
    | NoConstraints
    | DefinitionConstraints
    | PrimitiveDefinitionWeights
    | Float32Constraints
    | Float64Constraints
    | TextConstraints
    | QueryOrUpdateConstraints
    | CanisterMethodConstraints;

export type Context<Constraint extends Constraints = Record<string, never>> = {
    api: Api;
    constraints: Constraint;
};
