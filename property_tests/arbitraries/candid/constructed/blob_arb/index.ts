import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { blobToSrcLiteral } from '../../to_src_literal/blob';
import { CandidType } from '../../candid_type';
import { BlobValuesArb } from './values';
import { CandidValueAndMeta } from '../../value_and_meta_arb';
import { _VecNat8DefinitionArb } from './definition';

export const BlobArb = fc.oneof(
    VecNat8CandidValueAndMetaArb(),
    SimpleCandidValueAndMetaArb(
        fc.uint8Array(),
        CandidType.Blob,
        blobToSrcLiteral
    )
);

function VecNat8CandidValueAndMetaArb(): fc.Arbitrary<
    CandidValueAndMeta<Uint8Array>
> {
    return fc.tuple(_VecNat8DefinitionArb(), BlobValuesArb).map(
        ([
            {
                candidMeta: { typeAnnotation, typeAliasDeclarations, imports }
            },
            { agentArgumentValue, agentResponseValue, valueLiteral }
        ]): CandidValueAndMeta<Uint8Array> => ({
            src: {
                typeAnnotation,
                imports,
                typeAliasDeclarations,
                valueLiteral
            },
            agentArgumentValue,
            agentResponseValue
        })
    );
}
