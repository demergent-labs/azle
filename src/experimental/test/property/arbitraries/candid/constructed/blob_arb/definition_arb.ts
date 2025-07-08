import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { IDL } from '#lib/index';

import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    BlobCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';

export function BlobDefinitionArb(): WithShapesArb<BlobCandidDefinition> {
    return _VecNat8DefinitionArb();
}

export function _VecNat8DefinitionArb(): WithShapesArb<BlobCandidDefinition> {
    return fc
        .tuple(UniqueIdentifierArb('globalNames'), fc.boolean())
        .map(([name, useTypeDeclaration]): WithShapes<BlobCandidDefinition> => {
            const typeAnnotation = 'Uint8Array';
            const idl = 'IDL.Vec(IDL.Nat8)';
            const typeObject = idl;
            const variableAliasDeclarations = useTypeDeclaration
                ? [`const ${name} = ${typeObject}`]
                : [];
            const imports = new Set(['IDL']);
            return {
                definition: {
                    candidMeta: {
                        runtimeTypeObject: IDL.Vec(IDL.Nat8),
                        typeAnnotation,
                        typeObject: useTypeDeclaration ? name : typeObject,
                        variableAliasDeclarations,
                        imports,
                        candidType: 'blob'
                    }
                },
                recursiveShapes: {}
            };
        });
}
