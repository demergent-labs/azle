import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    FuncCandidDefinition
} from '../../candid_definition_arb/types';
import { VoidDefinitionArb } from '../../primitive/void';

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
                        candidType: 'Func'
                    },
                    paramCandidMeta: params,
                    returnCandidMeta: returnFunc
                };
            }
        );
}

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
