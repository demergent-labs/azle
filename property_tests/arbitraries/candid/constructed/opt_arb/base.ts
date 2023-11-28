import fc from 'fast-check';
import { CandidType } from '../../candid_type_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { Opt } from './index';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';

type SomeOrNone = 'Some' | 'None';

export function OptArb(
    candidTypeArb: fc.Arbitrary<CandidValueAndMeta<CandidType>>
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
    innerType: CandidValueAndMeta<CandidType>,
    useTypeDeclaration: boolean
) {
    if (useTypeDeclaration) {
        return `${
            innerType.src.typeDeclaration ?? ''
        }\nconst ${name} = ${generateCandidType(innerType)}`;
    }
    return innerType.src.typeDeclaration;
}

function generateCandidType(innerType: CandidValueAndMeta<CandidType>): string {
    return `Opt(${innerType.src.candidType})`;
}

function generateImports(
    innerType: CandidValueAndMeta<CandidType>
): Set<string> {
    return new Set([...innerType.src.imports, 'Opt', 'Some', 'None']);
}

function generateValue(
    someOrNone: SomeOrNone,
    innerType: CandidValueAndMeta<CandidType>,
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
    innerType: CandidValueAndMeta<CandidType>
): string {
    if (someOrNone === 'Some') {
        return `Some(${innerType.src.valueLiteral})`;
    } else {
        return `None`;
    }
}
