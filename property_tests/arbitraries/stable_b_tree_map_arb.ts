import fc from 'fast-check';
import { UniqueIdentifierArb } from './unique_identifier_arb';
import { createUniquePrimitiveArb } from './unique_primitive_arb';
import { CandidTypeArb } from './candid/candid_type_arb';

export const StableBTreeMapArb = fc
    .tuple(
        CandidTypeArb,
        CandidTypeArb,
        UniqueIdentifierArb('stableBTreeMap'),
        createUniquePrimitiveArb(
            fc.nat({
                max: 254
            })
        )
    )
    .map(([keySample, valueSample, uniqueIdentifier, memoryId]) => {
        const name = `stableBTreeMap${uniqueIdentifier}`;

        return {
            name,
            body: `let ${name} = StableBTreeMap<${keySample.src.candidType}, ${valueSample.src.candidType}>(stableJson, stableJson, ${memoryId});`,
            param0: keySample,
            param1: valueSample
        };
    });
