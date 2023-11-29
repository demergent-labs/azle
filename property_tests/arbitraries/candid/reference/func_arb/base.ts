import fc from 'fast-check';

import { PrincipalArb } from '../principal_arb';
import { VoidArb } from '../../primitive/void';
import { CandidValueAndMeta } from '../../candid_value_and_meta';
import { CorrespondingJSType } from '../../candid_type_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { Func } from './index';

type Mode = 'query' | 'update' | 'oneway';

export function FuncArb(
    candidTypeArb: fc.Arbitrary<CandidValueAndMeta<CorrespondingJSType>>
) {
    return (fc.constantFrom('query', 'update', 'oneway') as fc.Arbitrary<Mode>)
        .chain((mode) => {
            const returnType = mode === 'oneway' ? VoidArb : candidTypeArb;

            return fc.tuple(
                UniqueIdentifierArb('typeDeclaration'),
                fc.array(candidTypeArb),
                returnType,
                fc.constant(mode),
                PrincipalArb,
                fc.boolean()
            );
        })
        .map(
            ([
                name,
                params,
                returnFunc,
                mode,
                principal,
                useTypeDeclaration
            ]): CandidValueAndMeta<Func> => {
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
                    ...params.flatMap((param) => [...param.src.imports]),
                    ...returnFunc.src.imports,
                    'Func'
                ]);

                const value: Func = [principal.agentArgumentValue, name];

                const valueLiteral = `[${principal.src.valueLiteral}, '${name}']`;

                return {
                    src: {
                        typeAnnotation,
                        typeAliasDeclarations,
                        imports,
                        valueLiteral
                    },
                    agentArgumentValue: value,
                    agentResponseValue: value
                };
            }
        );
}

function generateTypeAliasDeclarations(
    name: string,
    paramCandids: CandidValueAndMeta<CorrespondingJSType>[],
    returnCandid: CandidValueAndMeta<CorrespondingJSType>,
    mode: Mode,
    useTypeDeclaration: boolean
): string[] {
    const paramTypeDeclarations = paramCandids
        .map((param) => param.src.typeAliasDeclarations ?? '')
        .join('\n');
    const returnTypeDeclaration = returnCandid.src.typeAliasDeclarations ?? '';

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
    paramCandids: CandidValueAndMeta<CorrespondingJSType>[],
    returnCandid: CandidValueAndMeta<CorrespondingJSType>,
    mode: Mode
): string {
    const params = paramCandids
        .map((param) => param.src.typeAnnotation)
        .join(', ');
    return `const ${name} = Func([${params}], ${returnCandid.src.typeAnnotation}, '${mode}')`;
}
