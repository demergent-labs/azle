import fc from 'fast-check';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { createUniquePrimitiveArb } from './unique_primitive_arb';
import { CandidValueAndMetaArb } from './candid/candid_value_and_meta_arb';

export const StableBTreeMapArb = fc
    .tuple(
        CandidValueAndMetaArb(),
        CandidValueAndMetaArb(),
        UniqueIdentifierArb('stableBTreeMap'),
        createUniquePrimitiveArb(
            fc.nat({
                max: 254
            })
        )
    )
    .map(([keySample, valueSample, uniqueIdentifier, memoryId]) => {
        const name = `stableBTreeMap${uniqueIdentifier}`;

        const imports = new Set([
            ...keySample.src.imports,
            ...valueSample.src.imports,
            'stableJson',
            'StableBTreeMap'
        ]);

        return {
            name,
            imports,
            definition: `let ${name} = StableBTreeMap<${keySample.src.candidTypeAnnotation}, ${valueSample.src.candidTypeAnnotation}>(stableJson, stableJson, ${memoryId});`,
            keySample,
            valueSample
        };
    });

// TODO there must be a better way to get this type out, the sample will actually run
export const StableBTreeMap = fc.sample(StableBTreeMapArb)[0];
export type StableBTreeMap = typeof StableBTreeMap;
