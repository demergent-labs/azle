import fc from 'fast-check';
import { CorrespondingJSType } from '../../candid_type_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta';
import { Opt } from './index';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    CandidValueArb,
    CandidValues,
    OptCandidDefinition
} from '../../candid_meta_arb';
import { CandidType } from '../../candid_type';

type SomeOrNone = 'Some' | 'None';

export function OptDefinitionArb(
    candidTypeArbForInnerType: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<OptCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            candidTypeArbForInnerType,
            fc.boolean()
        )
        .map(([name, innerType, useTypeDeclaration]): OptCandidDefinition => {
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
                    candidType: CandidType.Opt
                },
                innerType
            };
        });
}

export function OptArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Opt>> {
    return OptDefinitionArb(candidTypeArb)
        .chain((optDefinition) =>
            fc.tuple(fc.constant(optDefinition), OptValueArb(optDefinition))
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

export function OptValueArb(
    optDefinition: OptCandidDefinition
): fc.Arbitrary<CandidValues<Opt>> {
    const innerValue = fc.tuple(
        fc.constantFrom('Some', 'None') as fc.Arbitrary<SomeOrNone>,
        CandidValueArb(optDefinition.innerType)
    );

    return innerValue.map(([someOrNone, innerType]) => {
        const valueLiteral = generateValueLiteral(someOrNone, innerType);
        const agentArgumentValue = generateValue(someOrNone, innerType);
        const agentResponseValue = generateValue(someOrNone, innerType, true);

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

function generateTypeAnnotation(innerType: CandidDefinition): string {
    return `Opt(${innerType.candidMeta.typeAnnotation})`;
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Opt', 'Some', 'None']);
}

function generateValue(
    someOrNone: SomeOrNone,
    innerType: CandidValues<CorrespondingJSType>,
    useAgentResponseValue: boolean = false
): Opt {
    if (someOrNone === 'Some') {
        return [
            useAgentResponseValue
                ? innerType.agentResponseValue
                : innerType.agentArgumentValue
        ];
    } else {
        return [];
    }
}

function generateValueLiteral(
    someOrNone: SomeOrNone,
    innerType: CandidValues<CorrespondingJSType>
): string {
    if (someOrNone === 'Some') {
        return `Some(${innerType.valueLiteral})`;
    } else {
        return `None`;
    }
}
