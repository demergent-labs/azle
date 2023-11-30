import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta';
import { CorrespondingJSType } from '../../candid_type_arb';
import { Vec } from './index';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    CandidValueArb,
    CandidValues,
    VecCandidDefinition
} from '../../candid_meta_arb';
import { CandidType } from '../../candid_type';

export function VecDefinitionArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<VecCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            candidTypeArb,
            fc.boolean()
        )
        .map(([name, innerType, useTypeDeclaration]): VecCandidDefinition => {
            const typeAnnotation = useTypeDeclaration
                ? name
                : generateTypeAnnotation(innerType);

            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                innerType,
                useTypeDeclaration
            );

            const imports = generateImports(innerType);

            return {
                candidMeta: {
                    typeAnnotation,
                    typeAliasDeclarations,
                    imports,
                    candidType: CandidType.Vec
                },
                innerType: innerType
            };
        });
}

export function VecArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Vec>> {
    return VecDefinitionArb(candidTypeArb)
        .chain((vecType) =>
            fc.tuple(fc.constant(vecType), VecValueArb(vecType))
        )
        .map(
            ([
                {
                    candidMeta: {
                        typeAnnotation,
                        typeAliasDeclarations,
                        imports
                    }
                },
                { agentArgumentValue, agentResponseValue, valueLiteral }
            ]) => {
                return {
                    src: {
                        typeAnnotation,
                        typeAliasDeclarations,
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
    vecType: VecCandidDefinition
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

function generateTypeAliasDeclarations(
    name: string,
    innerType: CandidDefinition,
    useTypeDeclaration: boolean
): string[] {
    if (useTypeDeclaration) {
        return [
            ...innerType.candidMeta.typeAliasDeclarations,
            `const ${name} = ${generateTypeAnnotation(innerType)};`
        ];
    }
    return innerType.candidMeta.typeAliasDeclarations;
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Vec']);
}

function generateTypeAnnotation(innerType: CandidDefinition): string {
    return `Vec(${innerType.candidMeta.typeAnnotation})`;
}

function generateValue<T extends CorrespondingJSType>(
    array: CandidValues<T>[],
    candidType: CandidType,
    returned: boolean = false
): Vec {
    const value = array.map((sample) =>
        returned ? sample.agentResponseValue : sample.agentArgumentValue
    );

    if (candidType === CandidType.Int8) {
        return new Int8Array(value as number[]);
    }
    if (candidType === CandidType.Int16) {
        return new Int16Array(value as number[]);
    }
    if (candidType === CandidType.Int32) {
        return new Int32Array(value as number[]);
    }
    if (candidType === CandidType.Int64) {
        return new BigInt64Array(value as bigint[]);
    }
    if (candidType === CandidType.Nat8) {
        return new Uint8Array(value as number[]);
    }
    if (candidType === CandidType.Nat16) {
        return new Uint16Array(value as number[]);
    }
    if (candidType === CandidType.Nat32) {
        return new Uint32Array(value as number[]);
    }
    if (candidType === CandidType.Nat64) {
        return new BigUint64Array(value as bigint[]);
    }

    return value;
}

function generateValueLiteral<T extends CorrespondingJSType>(
    sample: CandidValues<T>[],
    innerCandidType: CandidType
) {
    const valueLiterals = sample.map((sample) => sample.valueLiteral).join(',');

    const valueLiteral = `[${valueLiterals}]`;

    if (innerCandidType === CandidType.Int64) {
        return `BigInt64Array.from(${valueLiteral})`;
    }

    if (innerCandidType === CandidType.Int32) {
        return `Int32Array.from(${valueLiteral})`;
    }

    if (innerCandidType === CandidType.Int16) {
        return `Int16Array.from(${valueLiteral})`;
    }

    if (innerCandidType === CandidType.Int8) {
        return `Int8Array.from(${valueLiteral})`;
    }

    if (innerCandidType === CandidType.Nat64) {
        return `BigUint64Array.from(${valueLiteral})`;
    }

    if (innerCandidType === CandidType.Nat32) {
        return `Uint32Array.from(${valueLiteral})`;
    }

    if (innerCandidType === CandidType.Nat16) {
        return `Uint16Array.from(${valueLiteral})`;
    }

    if (innerCandidType === CandidType.Nat8) {
        return `Uint8Array.from(${valueLiteral})`;
    }

    return valueLiteral;
}
