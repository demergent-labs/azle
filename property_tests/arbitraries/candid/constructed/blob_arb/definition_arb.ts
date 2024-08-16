import fc from 'fast-check';

import { blob } from '../../../../../src/lib/experimental';
import { Syntax } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    BlobCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';

export function BlobDefinitionArb(
    syntax: Syntax
): WithShapesArb<BlobCandidDefinition> {
    if (syntax === 'class') {
        return _VecNat8DefinitionArb(syntax);
    }
    return fc.oneof(
        SimpleCandidDefinitionArb('blob', syntax),
        _VecNat8DefinitionArb(syntax)
    );
}

export function _VecNat8DefinitionArb(
    syntax: Syntax
): WithShapesArb<BlobCandidDefinition> {
    return fc
        .tuple(UniqueIdentifierArb('globalNames'), fc.boolean())
        .map(([name, useTypeDeclaration]): WithShapes<BlobCandidDefinition> => {
            const candidTypeAnnotation =
                syntax === 'functional' ? 'Vec<nat8>' : 'Uint8Array';
            const idl = 'IDL.Vec(IDL.Nat8)';
            const candidTypeObject =
                syntax === 'functional' ? 'Vec(nat8)' : idl;
            const variableAliasDeclarations = useTypeDeclaration
                ? [`const ${name} = ${candidTypeObject}`]
                : [];
            const imports =
                syntax === 'functional'
                    ? new Set(['Vec', 'nat8'])
                    : new Set(['IDL']);
            return {
                definition: {
                    candidMeta: {
                        runtimeCandidTypeObject: blob,
                        candidTypeAnnotation,
                        candidTypeObject: useTypeDeclaration
                            ? name
                            : candidTypeObject,
                        variableAliasDeclarations,
                        imports,
                        candidType: 'blob'
                    }
                },
                recursiveShapes: {}
            };
        });
}
