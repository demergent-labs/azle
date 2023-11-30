import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta';
import { CorrespondingJSType } from '../../candid_type_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { ReturnTuple, Tuple } from './index';
import {
    CandidDefinition,
    CandidValueArb,
    CandidValues,
    TupleCandidDefinition
} from '../../candid_meta_arb';
import { CandidType } from '../../candid_type';

export function TupleDefinitionArb(
    candidTypeArbForFields: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<TupleCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.array(candidTypeArbForFields, { minLength: 1 }),
            // Although no minLength is technically required (according to the
            // spec), there are some issues with vecs of empty objects that are causing some problems
            // https://github.com/demergent-labs/azle/issues/1453
            fc.boolean()
        )
        .map(([name, fields, useTypeDeclaration]): TupleCandidDefinition => {
            const typeAnnotation = useTypeDeclaration
                ? name
                : generateTypeAnnotation(fields);

            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                fields,
                useTypeDeclaration
            );

            const imports = generateImports(fields);

            return {
                candidMeta: {
                    typeAnnotation,
                    typeAliasDeclarations,
                    imports,
                    candidType: CandidType.Tuple
                },
                innerTypes: fields
            };
        });
}

// TODO see if this works before ever trying to use it
export function CandidArb<
    T extends CorrespondingJSType,
    D extends CandidDefinition,
    V extends CandidValues<T>
>(
    definitionArb: (
        candidTypeArb: fc.Arbitrary<CandidDefinition>
    ) => fc.Arbitrary<D>,
    valueArb: (arb: D) => fc.Arbitrary<V>,
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<any>> {
    return definitionArb(candidTypeArb)
        .chain((tupleDefinition) =>
            fc.tuple(fc.constant(tupleDefinition), valueArb(tupleDefinition))
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

export function TupleArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Tuple, ReturnTuple>> {
    return TupleDefinitionArb(candidTypeArb)
        .chain((tupleDefinition) =>
            fc.tuple(
                fc.constant(tupleDefinition),
                TupleValueArb(tupleDefinition)
            )
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

export function TupleValueArb(
    tupleDefinition: TupleCandidDefinition
): fc.Arbitrary<CandidValues<Tuple, ReturnTuple>> {
    const fieldValues = tupleDefinition.innerTypes.map((innerType) => {
        const result: fc.Arbitrary<CandidValues<CorrespondingJSType>> =
            CandidValueArb(innerType);
        return result;
    });

    return fc.tuple(...fieldValues).map((fieldValues) => {
        const valueLiteral = generateValueLiteral(fieldValues);
        const agentArgumentValue = generateAgentArgumentValue(fieldValues);
        const agentResponseValue = generateAgentResponseValue(fieldValues);

        return {
            valueLiteral,
            agentArgumentValue,
            agentResponseValue
        };
    });
}

function generateAgentArgumentValue(
    fields: CandidValues<CorrespondingJSType>[]
): Tuple {
    return fields.map((field) => field.agentArgumentValue);
}

function generateAgentResponseValue(
    fields: CandidValues<CorrespondingJSType>[]
): ReturnTuple {
    if (fields.length === 0) {
        return {};
    }
    return fields.map((field) => field.agentResponseValue);
}

function generateTypeAliasDeclarations(
    name: string,
    fields: CandidDefinition[],
    useTypeDeclaration: boolean
): string[] {
    const fieldTypeAliasDeclarations = fields.flatMap(
        (field) => field.candidMeta.typeAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldTypeAliasDeclarations,
            `const ${name} = ${generateTypeAnnotation(fields)};`
        ];
    }
    return fieldTypeAliasDeclarations;
}

function generateTypeAnnotation(fields: CandidDefinition[]) {
    const innerTypes = fields.map((field) => field.candidMeta.typeAnnotation);

    return `Tuple(${innerTypes.join(', ')})`;
}

function generateImports(fields: CandidDefinition[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field.candidMeta.imports
    ]);
    return new Set([...fieldImports, 'Tuple']);
}

function generateValueLiteral(fields: CandidValues<CorrespondingJSType>[]) {
    const fieldLiterals = fields.map((field) => field.valueLiteral).join(',\n');

    return `[
        ${fieldLiterals}
    ]`;
}
