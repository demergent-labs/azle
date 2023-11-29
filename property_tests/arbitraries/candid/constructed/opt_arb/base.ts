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
            const candidType = useTypeDeclaration
                ? name
                : generateCandidType(innerType);

            const typeDeclaration = generateTypeDeclaration(
                name,
                innerType,
                useTypeDeclaration
            );

            return {
                src: {
                    candidType,
                    imports: generateImports(innerType),
                    typeDeclaration,
                    valueLiteral: generateValueLiteral(someOrNone, innerType)
                },
                agentArgumentValue: generateValue(someOrNone, innerType),
                agentResponseValue: generateValue(someOrNone, innerType, true)
            };
        });
}

function generateTypeDeclaration(
    name: string,
    innerType: CandidValueAndMeta<CorrespondingJSType>,
    useTypeDeclaration: boolean
) {
    if (useTypeDeclaration) {
        return `${
            innerType.src.typeDeclaration ?? ''
        }\nconst ${name} = ${generateCandidType(innerType)}`;
    }
    return innerType.src.typeDeclaration;
}

function generateCandidType(
    innerType: CandidValueAndMeta<CorrespondingJSType>
): string {
    return `Opt(${innerType.src.candidType})`;
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
