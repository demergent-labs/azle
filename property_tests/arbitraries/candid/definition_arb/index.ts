import fc from 'fast-check';
import { IntDefinitionArb } from '../primitive/ints/int_arb';
import { Int8DefinitionArb } from '../primitive/ints/int8_arb';
import { Int16DefinitionArb } from '../primitive/ints/int16_arb';
import { Int32DefinitionArb } from '../primitive/ints/int32_arb';
import { Int64DefinitionArb } from '../primitive/ints/int64_arb';
import { NatDefinitionArb } from '../primitive/nats/nat_arb';
import { Nat8DefinitionArb } from '../primitive/nats/nat8_arb';
import { Nat16DefinitionArb } from '../primitive/nats/nat16_arb';
import { Nat32DefinitionArb } from '../primitive/nats/nat32_arb';
import { Nat64DefinitionArb } from '../primitive/nats/nat64_arb';
import { BoolDefinitionArb } from '../primitive/bool';
import { PrincipalDefinitionArb } from '../reference/principal_arb';
import { Float32DefinitionArb } from '../primitive/floats/float32_arb';
import { Float64DefinitionArb } from '../primitive/floats/float64_arb';
import { TextDefinitionArb } from '../primitive/text';
import { VariantDefinitionArb } from '../constructed/variant_arb/definition_arbs';
import { RecordDefinitionArb } from '../constructed/record_arb/definition_arb';
import { TupleDefinitionArb } from '../constructed/tuple_arb/definition_arb';
import { OptDefinitionArb } from '../constructed/opt_arb/definition_arb';
import { VecDefinitionArb } from '../constructed/vec_arb/definition_arb';
import { FuncDefinitionArb } from '../reference/func_arb/definition_arb';
import {
    CandidDefinition,
    FuncCandidDefinition,
    OptCandidDefinition,
    RecordCandidDefinition,
    TupleCandidDefinition,
    VariantCandidDefinition,
    VecCandidDefinition
} from './types';

export const CandidDefinitionArb: fc.Arbitrary<CandidDefinition> = fc.letrec(
    (tie) => ({
        CandidDefinition: fc.oneof(
            Float32DefinitionArb,
            Float64DefinitionArb,
            IntDefinitionArb,
            Int8DefinitionArb,
            Int16DefinitionArb,
            Int32DefinitionArb,
            Int64DefinitionArb,
            NatDefinitionArb,
            Nat8DefinitionArb,
            Nat16DefinitionArb,
            Nat32DefinitionArb,
            Nat64DefinitionArb,
            BoolDefinitionArb,
            // NullDefinitionArb, // Must be excluded until https://github.com/demergent-labs/azle/issues/1453 gets resolved
            TextDefinitionArb,
            PrincipalDefinitionArb,
            tie('Func').map((sample) => sample as FuncCandidDefinition),
            tie('Record').map((sample) => sample as RecordCandidDefinition),
            tie('Vec').map((sample) => sample as VecCandidDefinition),
            tie('Variant').map((sample) => sample as VariantCandidDefinition),
            tie('Tuple').map((sample) => sample as TupleCandidDefinition),
            tie('Opt').map((sample) => sample as OptCandidDefinition)
            // tie('Service').map((sample) => sample as ServiceCandidDefinition) // Services Aren't working with deep equals
        ),
        Func: FuncDefinitionArb(
            tie('CandidDefinition') as fc.Arbitrary<CandidDefinition>
        ),
        Opt: OptDefinitionArb(
            tie('CandidDefinition') as fc.Arbitrary<CandidDefinition>
        ),
        Record: RecordDefinitionArb(
            tie('CandidDefinition') as fc.Arbitrary<CandidDefinition>
        ),
        // Service: ServiceDefinitionArb(
        //     tie('CandidDefinition') as fc.Arbitrary<CandidDefinition>
        // ),
        Tuple: TupleDefinitionArb(
            tie('CandidDefinition') as fc.Arbitrary<CandidDefinition>
        ),
        Vec: VecDefinitionArb(
            tie('CandidDefinition') as fc.Arbitrary<CandidDefinition>
        ),
        Variant: VariantDefinitionArb(
            tie('CandidDefinition') as fc.Arbitrary<CandidDefinition>
        )
    })
).CandidDefinition;
