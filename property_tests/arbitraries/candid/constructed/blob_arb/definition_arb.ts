import fc from 'fast-check';

import { blob } from '../../../../../src/lib/experimental';
import { Api } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    BlobCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';

export function BlobDefinitionArb(
    api: Api
): WithShapesArb<BlobCandidDefinition> {
    if (api === 'class') {
        return _VecNat8DefinitionArb(api);
    }
    return fc.oneof(
        SimpleCandidDefinitionArb('blob', api),
        _VecNat8DefinitionArb(api)
    );
}

export function _VecNat8DefinitionArb(
    api: Api
): WithShapesArb<BlobCandidDefinition> {
    return fc
        .tuple(UniqueIdentifierArb('globalNames'), fc.boolean())
        .map(([name, useTypeDeclaration]): WithShapes<BlobCandidDefinition> => {
            const typeAnnotation =
                api === 'functional' ? 'Vec<nat8>' : 'Uint8Array';
            const idl = 'IDL.Vec(IDL.Nat8)';
            const typeObject = api === 'functional' ? 'Vec(nat8)' : idl;
            const variableAliasDeclarations = useTypeDeclaration
                ? [`const ${name} = ${typeObject}`]
                : [];
            const imports =
                api === 'functional'
                    ? new Set(['Vec', 'nat8'])
                    : new Set(['IDL']);
            return {
                definition: {
                    candidMeta: {
                        runtimeTypeObject: blob,
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
