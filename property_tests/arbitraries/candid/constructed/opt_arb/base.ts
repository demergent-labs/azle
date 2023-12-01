import fc from 'fast-check';
import { CandidType } from '../../candid_type_arb';
import { CandidMeta } from '../../candid_arb';
import { Opt } from './index';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';

type SomeOrNone = 'Some' | 'None';

export function OptArb(
    candidTypeArb: fc.Arbitrary<CandidMeta<CandidType>>
): fc.Arbitrary<CandidMeta<Opt>> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.constantFrom('Some', 'None') as fc.Arbitrary<SomeOrNone>,
            candidTypeArb,
            fc.boolean()
        )
        .map(([name, someOrNone, innerType, useTypeDeclaration]) => {
            const { candidTypeObject, candidType } = useTypeDeclaration
                ? {
                      candidTypeObject: name,
                      candidType: `typeof ${name}.tsType`
                  }
                : generateCandidType(innerType);

            const typeDeclaration = generateTypeDeclaration(
                name,
                innerType,
                useTypeDeclaration
            );

            return {
                src: {
                    candidTypeObject,
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
    innerType: CandidMeta<CandidType>,
    useTypeDeclaration: boolean
) {
    if (useTypeDeclaration) {
        return `${innerType.src.typeDeclaration ?? ''}\nconst ${name} = ${
            generateCandidType(innerType).candidTypeObject
        }`;
    }
    return innerType.src.typeDeclaration;
}

function generateCandidType(innerType: CandidMeta<CandidType>): {
    candidTypeObject: string;
    candidType: string;
} {
    return {
        candidTypeObject: `Opt(${innerType.src.candidTypeObject})`,
        candidType: `Opt<${innerType.src.candidType}>`
    };
}

function generateImports(innerType: CandidMeta<CandidType>): Set<string> {
    return new Set([...innerType.src.imports, 'Opt', 'Some', 'None']);
}

function generateValue(
    someOrNone: SomeOrNone,
    innerType: CandidMeta<CandidType>,
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
    innerType: CandidMeta<CandidType>
): string {
    if (someOrNone === 'Some') {
        return `Some(${innerType.src.valueLiteral})`;
    } else {
        return `None`;
    }
}
