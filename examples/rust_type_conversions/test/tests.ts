import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/rust_type_conversions/rust_type_conversions.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    rustTypeConversionsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'inline query',
            test: async () => {
                const result = await rustTypeConversionsCanister.inlineQuery();

                return {
                    Ok: result === undefined
                };
            }
        }
    ];
}

// TODO Add tests for all these methods

// inlineQuery
// simpleQuery
// complexRecordTest
// oneVariant
// variousVariants
// selfReference
// inLine
// inlineVec
// tupleTest
// voidAliasTest

// notSoSimple
// getPrincipals
// everythingInline
// optionTest
// arrayTest
// ultimateSelfReferenceTest
// hashDuplicationTest
