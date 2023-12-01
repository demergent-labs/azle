import fc, { sample } from 'fast-check';
import { CandidMeta, Src } from '../../candid_arb';
import { CandidType } from '../../candid_type_arb';
import { Vec } from './index';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';

export function VecInnerArb<T extends CandidType>(
    arb: fc.Arbitrary<CandidMeta<T>>
): fc.Arbitrary<CandidMeta<Vec>> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.array(arb),
            arb,
            fc.boolean()
        )
        .map(
            ([
                name,
                vecOfInnerType,
                { src: innerTypeSrc },
                useTypeDeclaration
            ]): CandidMeta<Vec> => {
                const valueLiteral = generateValueLiteral(
                    vecOfInnerType,
                    innerTypeSrc.candidTypeObject
                );
                const { candidTypeObject, candidType } = useTypeDeclaration
                    ? {
                          candidTypeObject: name,
                          candidType: `typeof ${name}.tsType`
                      }
                    : generateCandidType(innerTypeSrc);

                const imports = generateImports(innerTypeSrc);

                const typeDeclaration = generateTypeDeclaration(
                    name,
                    innerTypeSrc,
                    useTypeDeclaration
                );

                const agentArgumentValue = generateValue(
                    vecOfInnerType,
                    innerTypeSrc.candidTypeObject
                );

                const agentResponseValue = generateValue(
                    vecOfInnerType,
                    innerTypeSrc.candidTypeObject
                );

                return {
                    agentArgumentValue,
                    agentResponseValue,
                    src: {
                        candidTypeObject,
                        candidType,
                        imports,
                        typeDeclaration,
                        valueLiteral
                    }
                };
            }
        );
}

// Exploration for making VecArb use CandidTypeArb
// export function VecArb(
//     candidTypeArb: fc.Arbitrary<CandidMeta<CandidType>>
// ): fc.Arbitrary<CandidMeta<Vec>> {
//     candidTypeArb.chain((innerType) => {
//         return fc.array(fc.constant(innerType));
//     });
//     return fc
//         .tuple(
//             UniqueIdentifierArb('typeDeclaration'),
//             fc.array(candidTypeArb),
//             fc.boolean()
//         )
//         .map(([name, innerType, useTypeDeclaration]) => {
//             const candidType = useTypeDeclaration
//                 ? name
//                 : generateCandidType(innerType);

//             const imports = generateImports(innerType);

//             const typeDeclaration = generateTypeDeclaration(
//                 name,
//                 innerType,
//                 useTypeDeclaration
//             );

//             const valueLiteral = generateValueLiteral(innerType);

//             return {
//                 src: {
//                     candidType,
//                     imports,
//                     typeDeclaration,
//                     valueLiteral
//                 },
//                 value,
//                 expectedValue
//             };
//         });
// }

function generateTypeDeclaration(
    name: string,
    innerTypeSrc: Src,
    useTypeDeclaration: boolean
) {
    if (useTypeDeclaration) {
        return `${innerTypeSrc.typeDeclaration ?? ''}\nconst ${name} = ${
            generateCandidType(innerTypeSrc).candidTypeObject
        }`;
    }
    return innerTypeSrc.typeDeclaration;
}

function generateImports(innerTypeSrc: Src): Set<string> {
    // Hack until https://github.com/demergent-labs/azle/issues/1453 gets fixed
    if (innerTypeSrc.candidTypeObject === 'Null') {
        return new Set([...innerTypeSrc.imports, 'Vec', 'bool']);
    }
    return new Set([...innerTypeSrc.imports, 'Vec']);
}

function generateCandidType(innerTypeSrc: Src): {
    candidTypeObject: string;
    candidType: string;
} {
    // Hack until https://github.com/demergent-labs/azle/issues/1453 gets fixed
    if (innerTypeSrc.candidTypeObject === 'Null') {
        return {
            candidTypeObject: `Vec(bool)`,
            candidType: `Vec<bool>`
        };
    }

    return {
        candidTypeObject: `Vec(${innerTypeSrc.candidTypeObject})`,
        candidType: `Vec<${innerTypeSrc.candidType}>`
    };
}

function generateValue<T extends CandidType>(
    array: CandidMeta<T>[],
    candidType: string,
    returned: boolean = false
): Vec {
    // Hack until https://github.com/demergent-labs/azle/issues/1453 gets fixed
    if (candidType === 'Null') {
        return Array(array.length).fill(false);
    }
    const value = array.map((sample) =>
        returned ? sample.agentResponseValue : sample.agentArgumentValue
    );

    if (candidType === 'int8') {
        return new Int8Array(value as number[]);
    }
    if (candidType === 'int16') {
        return new Int16Array(value as number[]);
    }
    if (candidType === 'int32') {
        return new Int32Array(value as number[]);
    }
    if (candidType === 'int64') {
        return new BigInt64Array(value as bigint[]);
    }
    if (candidType === 'nat8') {
        return new Uint8Array(value as number[]);
    }
    if (candidType === 'nat16') {
        return new Uint16Array(value as number[]);
    }
    if (candidType === 'nat32') {
        return new Uint32Array(value as number[]);
    }
    if (candidType === 'nat64') {
        return new BigUint64Array(value as bigint[]);
    }

    return value;
}

function generateValueLiteral<T extends CandidType>(
    sample: CandidMeta<T>[],
    candidType: string
) {
    // Hack until https://github.com/demergent-labs/azle/issues/1453 gets fixed
    if (candidType === 'Null') {
        return `[${Array(sample.length).fill(false)}]`;
    }
    const valueLiterals = sample
        .map((sample) => sample.src.valueLiteral)
        .join(',');

    const valueLiteral = `[${valueLiterals}]`;

    if (candidType === 'int64') {
        return `BigInt64Array.from(${valueLiteral})`;
    }

    if (candidType === 'int32') {
        return `Int32Array.from(${valueLiteral})`;
    }

    if (candidType === 'int16') {
        return `Int16Array.from(${valueLiteral})`;
    }

    if (candidType === 'int8') {
        return `Int8Array.from(${valueLiteral})`;
    }

    if (candidType === 'nat64') {
        return `BigUint64Array.from(${valueLiteral})`;
    }

    if (candidType === 'nat32') {
        return `Uint32Array.from(${valueLiteral})`;
    }

    if (candidType === 'nat16') {
        return `Uint16Array.from(${valueLiteral})`;
    }

    if (candidType === 'nat8') {
        return `Uint8Array.from(${valueLiteral})`;
    }

    return valueLiteral;
}
