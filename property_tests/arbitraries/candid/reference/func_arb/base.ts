import fc from 'fast-check';

import { PrincipalArb } from '../principal_arb';
import { VoidDefinitionArb } from '../../primitive/void';
import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { Func } from './index';
import {
    CandidDefinition,
    FuncCandidDefinition
} from '../../definition_arb/types';
import { CandidType } from '../../candid_type';
import { TextArb } from '../../primitive/text';
import { CandidValues } from '../../values';

type Mode = 'query' | 'update' | 'oneway';

export function FuncDefinitionArb(
    candidDefArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<FuncCandidDefinition> {
    return (fc.constantFrom('query', 'update', 'oneway') as fc.Arbitrary<Mode>)
        .chain((mode) => {
            const returnType =
                mode === 'oneway' ? VoidDefinitionArb : candidDefArb;

            return fc.tuple(
                UniqueIdentifierArb('typeDeclaration'),
                fc.array(candidDefArb),
                returnType,
                fc.constant(mode),
                fc.boolean()
            );
        })
        .map(
            ([
                name,
                params,
                returnFunc,
                mode,
                useTypeDeclaration
            ]): FuncCandidDefinition => {
                const typeAliasDeclarations = generateTypeAliasDeclarations(
                    name,
                    params,
                    returnFunc,
                    mode,
                    useTypeDeclaration
                );

                const typeAnnotation = useTypeDeclaration
                    ? name
                    : generateTypeAnnotation(params, returnFunc, mode);

                const imports = new Set([
                    ...params.flatMap((param) => [...param.candidMeta.imports]),
                    ...returnFunc.candidMeta.imports,
                    'Func'
                ]);

                return {
                    candidMeta: {
                        typeAnnotation,
                        typeAliasDeclarations,
                        imports,
                        candidType: CandidType.Func
                    },
                    paramCandidMeta: params,
                    returnCandidMeta: returnFunc
                };
            }
        );
}

export function FuncArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Func>> {
    return fc.tuple(FuncDefinitionArb(candidDefinitionArb), FuncValueArb).map(
        ([
            {
                candidMeta: { typeAnnotation, typeAliasDeclarations, imports }
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

export const FuncValueArb: fc.Arbitrary<CandidValues<Func>> = fc
    .tuple(TextArb, PrincipalArb)
    .map(([name, principal]) => {
        const value: Func = [
            principal.agentArgumentValue,
            name.agentArgumentValue
        ];

        const valueLiteral = `[${principal.src.valueLiteral}, ${name.src.valueLiteral}]`;

        return {
            valueLiteral,
            agentArgumentValue: value,
            agentResponseValue: value
        };
    });

function generateTypeAliasDeclarations(
    name: string,
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode,
    useTypeDeclaration: boolean
): string[] {
    const paramTypeDeclarations = paramCandids.flatMap(
        (param) => param.candidMeta.typeAliasDeclarations
    );
    const returnTypeDeclaration = returnCandid.candidMeta.typeAliasDeclarations;

    if (useTypeDeclaration) {
        return [
            ...paramTypeDeclarations,
            ...returnTypeDeclaration,
            `const ${name} = ${generateTypeAnnotation(
                paramCandids,
                returnCandid,
                mode
            )}`
        ];
    }

    return [...paramTypeDeclarations, ...returnTypeDeclaration];
}

function generateTypeAnnotation(
    paramCandids: CandidDefinition[],
    returnCandid: CandidDefinition,
    mode: Mode
): string {
    const params = paramCandids
        .map((param) => param.candidMeta.typeAnnotation)
        .join(', ');
    return `Func([${params}], ${returnCandid.candidMeta.typeAnnotation}, '${mode}')`;
}
