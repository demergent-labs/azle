import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidType } from '../../candid_type_arb';
import { Vec } from './index';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidTypeMeta,
    CandidValueArb,
    CandidValues,
    VecCandidMeta
} from '../../candid_meta_arb';
import { CandidClass } from '../../candid_class';

export function VecTypeArb(
    candidTypeArb: fc.Arbitrary<CandidTypeMeta>
): fc.Arbitrary<VecCandidMeta> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            candidTypeArb,
            fc.boolean()
        )
        .map(([name, innerType, useTypeDeclaration]): VecCandidMeta => {
            useTypeDeclaration = false;
            const candidType = useTypeDeclaration
                ? name
                : generateCandidType(innerType);

            const typeDeclaration = generateTypeDeclaration(
                name,
                innerType,
                useTypeDeclaration
            );

            const imports = generateImports(innerType);

            return {
                candidMeta: {
                    candidType,
                    typeDeclaration,
                    imports,
                    candidClass: CandidClass.Vec
                },
                innerType: innerType
            };
        });
}

export function VecArb(
    candidTypeArb: fc.Arbitrary<CandidTypeMeta>
): fc.Arbitrary<CandidValueAndMeta<Vec>> {
    return VecTypeArb(candidTypeArb)
        .chain((vecType) =>
            fc.tuple(fc.constant(vecType), VecValueArb(vecType))
        )
        .map(
            ([
                recordType,
                { agentArgumentValue, agentResponseValue, valueLiteral }
            ]) => {
                const candidType = recordType.candidMeta.candidType;
                const typeDeclaration = recordType.candidMeta.candidType;
                const imports = recordType.candidMeta.imports;

                return {
                    src: {
                        candidType,
                        typeDeclaration,
                        imports,
                        valueLiteral
                    },
                    agentArgumentValue,
                    agentResponseValue
                };
            }
        );
}

export function VecValueArb(
    vecType: VecCandidMeta
): fc.Arbitrary<CandidValues<Vec>> {
    const arbitraryMemberValues = fc
        .tuple(fc.array(fc.constant(null)), fc.constant(vecType.innerType))
        .chain(([arrayTemplate, innerType]) =>
            fc.tuple(...arrayTemplate.map(() => CandidValueArb(innerType)))
        );

    const innerCandidType = vecType.innerType.candidMeta.candidType;

    return arbitraryMemberValues.map((fieldValues) => {
        const valueLiteral = generateValueLiteral(fieldValues, innerCandidType);
        const agentArgumentValue = generateValue(fieldValues, innerCandidType);
        const agentResponseValue = generateValue(
            fieldValues,
            innerCandidType,
            true
        );
        return {
            valueLiteral,
            agentArgumentValue,
            agentResponseValue
        };
    });
}

function generateTypeDeclaration(
    name: string,
    innerType: CandidTypeMeta,
    useTypeDeclaration: boolean
): string {
    if (useTypeDeclaration) {
        return `${
            innerType.candidMeta.typeDeclaration ?? ''
        }\nconst ${name} = ${generateCandidType(innerType)}`;
    }
    return innerType.candidMeta.typeDeclaration;
}

function generateImports(innerType: CandidTypeMeta): Set<string> {
    // Hack until https://github.com/demergent-labs/azle/issues/1453 gets fixed
    if (innerType.candidMeta.candidType === 'Null') {
        return new Set([...innerType.candidMeta.imports, 'Vec', 'bool']);
    }
    return new Set([...innerType.candidMeta.imports, 'Vec']);
}

function generateCandidType(innerType: CandidTypeMeta): string {
    // Hack until https://github.com/demergent-labs/azle/issues/1453 gets fixed
    if (innerType.candidMeta.candidType === 'Null') {
        return `Vec(bool)`;
    }
    return `Vec(${innerType.candidMeta.candidType})`;
}

function generateValue<T extends CandidType>(
    array: CandidValues<T>[],
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
    sample: CandidValues<T>[],
    innerCandidType: string
) {
    // Hack until https://github.com/demergent-labs/azle/issues/1453 gets fixed
    if (innerCandidType === 'Null') {
        return `[${Array(sample.length).fill(false)}]`;
    }
    const valueLiterals = sample.map((sample) => sample.valueLiteral).join(',');

    const valueLiteral = `[${valueLiterals}]`;

    if (innerCandidType === 'int64') {
        return `BigInt64Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'int32') {
        return `Int32Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'int16') {
        return `Int16Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'int8') {
        return `Int8Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'nat64') {
        return `BigUint64Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'nat32') {
        return `Uint32Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'nat16') {
        return `Uint16Array.from(${valueLiteral})`;
    }

    if (innerCandidType === 'nat8') {
        return `Uint8Array.from(${valueLiteral})`;
    }

    return valueLiteral;
}
