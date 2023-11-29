import fc from 'fast-check';
import { CandidType } from './candid_type_arb';
import {
    CandidClass,
    CandidValues,
    PrimitiveCandidMeta,
    primitiveCandidClassToImports,
    primitiveCandidClassToType
} from './candid_meta_arb';
import { UniqueIdentifierArb } from '../unique_identifier_arb';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type CandidValueAndMeta<T extends CandidType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    src: Src;
};

export type Src = {
    candidType: string;
    typeDeclaration?: string;
    imports: Set<string>;
    valueLiteral: string;
};

export function OldPrimitiveCandidValueAndMetaArb<T extends CandidType>(
    arb: fc.Arbitrary<T>,
    candidType: string,
    toLiteral: (value: T) => string
): fc.Arbitrary<CandidValueAndMeta<T>> {
    return arb.map(
        (value): CandidValueAndMeta<T> => ({
            src: {
                candidType,
                imports: new Set([candidType]),
                valueLiteral: toLiteral(value)
            },
            agentArgumentValue: value,
            agentResponseValue: value
        })
    );
}

export function PrimitiveCandidValueAndMetaArb<T extends CandidType>(
    arb: fc.Arbitrary<T>,
    candidClass: CandidClass,
    toLiteral: (value: T) => string
) {
    return fc
        .tuple(
            PrimitiveCandidMetaArb(candidClass),
            PrimitiveCandidValueArb(arb, toLiteral)
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

export function PrimitiveCandidMetaArb(
    candidClass: CandidClass
): fc.Arbitrary<PrimitiveCandidMeta> {
    return fc
        .tuple(UniqueIdentifierArb('typeDeclaration'), fc.boolean())
        .map(([name, useTypeDeclaration]) => {
            useTypeDeclaration = false;
            const candidType = useTypeDeclaration
                ? name
                : primitiveCandidClassToType(candidClass);
            const imports = primitiveCandidClassToImports(candidClass);
            const typeDeclaration = generateTypeDeclaration(
                name,
                candidType,
                useTypeDeclaration
            );
            return {
                candidMeta: {
                    candidClass,
                    candidType,
                    imports,
                    typeDeclaration
                }
            };
        });
}

export function PrimitiveCandidValueArb<T extends CandidType>(
    arb: fc.Arbitrary<T>,
    toLiteral: (value: T) => string
): fc.Arbitrary<CandidValues<T>> {
    return arb.map((value): CandidValues<T> => {
        return {
            valueLiteral: toLiteral(value),
            agentArgumentValue: value,
            agentResponseValue: value
        };
    });
}

function generateTypeDeclaration(
    name: string,
    candidType: string,
    useTypeDeclaration: boolean
): string {
    if (useTypeDeclaration) {
        return `const ${name} = ${candidType};`;
    }
    return '';
}
