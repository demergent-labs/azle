import fc from 'fast-check';
import { CorrespondingJSType } from '../../candid_type_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta';
import { Opt } from './index';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';

type SomeOrNone = 'Some' | 'None';

export function OptArb(
    candidTypeArb: fc.Arbitrary<CandidValueAndMeta<CorrespondingJSType>>
): fc.Arbitrary<CandidValueAndMeta<Opt>> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.constantFrom('Some', 'None') as fc.Arbitrary<SomeOrNone>,
            candidTypeArb,
            fc.boolean()
        )
        .map(([name, someOrNone, innerType, useTypeDeclaration]) => {
            const typeAnnotation = useTypeDeclaration
                ? name
                : generateTypeAnnotation(innerType);

            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                innerType,
                useTypeDeclaration
            );

            return {
                src: {
                    typeAnnotation,
                    imports: generateImports(innerType),
                    typeAliasDeclarations,
                    valueLiteral: generateValueLiteral(someOrNone, innerType)
                },
                agentArgumentValue: generateValue(someOrNone, innerType),
                agentResponseValue: generateValue(someOrNone, innerType, true)
            };
        });
}

function generateTypeAliasDeclarations(
    name: string,
    innerType: CandidValueAndMeta<CorrespondingJSType>,
    useTypeDeclaration: boolean
): string[] {
    if (useTypeDeclaration) {
        return [
            ...innerType.src.typeAliasDeclarations,
            `const ${name} = ${generateTypeAnnotation(innerType)};`
        ];
    }
    return innerType.src.typeAliasDeclarations;
}

function generateTypeAnnotation(
    innerType: CandidValueAndMeta<CorrespondingJSType>
): string {
    return `Opt(${innerType.src.typeAnnotation})`;
}

function generateImports(
    innerType: CandidValueAndMeta<CorrespondingJSType>
): Set<string> {
    return new Set([...innerType.src.imports, 'Opt', 'Some', 'None']);
}

function generateValue(
    someOrNone: SomeOrNone,
    innerType: CandidValueAndMeta<CorrespondingJSType>,
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
    innerType: CandidValueAndMeta<CorrespondingJSType>
): string {
    if (someOrNone === 'Some') {
        return `Some(${innerType.src.valueLiteral})`;
    } else {
        return `None`;
    }
}
