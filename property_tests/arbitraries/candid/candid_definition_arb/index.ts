import fc from 'fast-check';
import { BoolDefinitionArb } from '../primitive/bool';
import { Float32DefinitionArb } from '../primitive/floats/float32_arb';
import { Float64DefinitionArb } from '../primitive/floats/float64_arb';
import { FuncDefinitionArb } from '../reference/func_arb/definition_arb';
import { Int16DefinitionArb } from '../primitive/ints/int16_arb';
import { Int32DefinitionArb } from '../primitive/ints/int32_arb';
import { Int64DefinitionArb } from '../primitive/ints/int64_arb';
import { Int8DefinitionArb } from '../primitive/ints/int8_arb';
import { IntDefinitionArb } from '../primitive/ints/int_arb';
import { Nat16DefinitionArb } from '../primitive/nats/nat16_arb';
import { Nat32DefinitionArb } from '../primitive/nats/nat32_arb';
import { Nat64DefinitionArb } from '../primitive/nats/nat64_arb';
import { Nat8DefinitionArb } from '../primitive/nats/nat8_arb';
import { NatDefinitionArb } from '../primitive/nats/nat_arb';
import { OptDefinitionArb } from '../constructed/opt_arb/definition_arb';
import { PrincipalDefinitionArb } from '../reference/principal_arb';
import { RecordDefinitionArb } from '../constructed/record_arb/definition_arb';
import { TextDefinitionArb } from '../primitive/text';
import { TupleDefinitionArb } from '../constructed/tuple_arb/definition_arb';
import { VariantDefinitionArb } from '../constructed/variant_arb/definition_arbs';
import { VecDefinitionArb } from '../constructed/vec_arb/definition_arb';
import {
    CandidDefinition,
    FuncCandidDefinition,
    OptCandidDefinition,
    RecordCandidDefinition,
    TupleCandidDefinition,
    VariantCandidDefinition,
    VecCandidDefinition,
    CandidDefinitionArb
} from './types';
import { BlobDefinitionArb } from '../constructed/blob_arb/definition_arb';
import { recursiveOptions } from '../recursive';

export function candidDefinitionArb(): CandidDefinitionArb {
    return fc.letrec((tie) => ({
        CandidDefinition: fc.oneof(
            BlobDefinitionArb(),
            tie('Opt').map((sample) => sample as OptCandidDefinition),
            tie('Record').map((sample) => sample as RecordCandidDefinition),
            tie('Tuple').map((sample) => sample as TupleCandidDefinition),
            tie('Variant').map((sample) => sample as VariantCandidDefinition),
            tie('Vec').map((sample) => sample as VecCandidDefinition),
            BoolDefinitionArb(),
            Float32DefinitionArb(),
            Float64DefinitionArb(),
            IntDefinitionArb(),
            Int8DefinitionArb(),
            Int16DefinitionArb(),
            Int32DefinitionArb(),
            Int64DefinitionArb(),
            NatDefinitionArb(),
            Nat8DefinitionArb(),
            Nat16DefinitionArb(),
            Nat32DefinitionArb(),
            Nat64DefinitionArb(),
            // NullDefinitionArb(), // Must be excluded until https://github.com/demergent-labs/azle/issues/1453 gets resolved
            TextDefinitionArb(),
            tie('Func').map((sample) => sample as FuncCandidDefinition),
            PrincipalDefinitionArb()
            // tie('Service').map((sample) => sample as ServiceCandidDefinition) // Services Aren't working with deep equals
        ),

        Func: FuncDefinitionArb(possiblyRecursiveArb(tie)),
        Opt: OptDefinitionArb(possiblyRecursiveArb(tie)),
        Record: RecordDefinitionArb(possiblyRecursiveArb(tie)),
        // Service: ServiceDefinitionArb(possiblyRecursiveArb(tie)),
        Tuple: TupleDefinitionArb(possiblyRecursiveArb(tie)),
        Variant: VariantDefinitionArb(possiblyRecursiveArb(tie)),
        Vec: VecDefinitionArb(possiblyRecursiveArb(tie))
    })).CandidDefinition;
}

function possiblyRecursiveArb(
    tie: fc.LetrecLooselyTypedTie
): fc.Arbitrary<CandidDefinition> {
    const notRecursiveArb = tie(
        'CandidDefinition'
    ) as fc.Arbitrary<CandidDefinition>;
    return fc
        .tuple(
            fc.constant(recursiveOptions),
            fc.nat(Math.max(recursiveOptions.length, 0))
        )
        .chain(([recDefs, randomIndex]) => {
            if (recDefs.length === 0) {
                return notRecursiveArb;
            }
            return fc.oneof(
                { arbitrary: fc.constant(recDefs[randomIndex]), weight: 1 },
                { arbitrary: notRecursiveArb, weight: 1 }
            );
        });
}
