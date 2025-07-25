import 'azle/experimental/_internal/test/set_experimental';

import { runPropTests } from 'azle/experimental/_internal/test/property';
import { CorrespondingJSType } from 'azle/experimental/_internal/test/property/arbitraries/candid/corresponding_js_type';
import { CanisterArb } from 'azle/experimental/_internal/test/property/arbitraries/canister_arb';
import { UpdateMethod } from 'azle/experimental/_internal/test/property/arbitraries/canister_methods/update_method_arb';
import { StableBTreeMapArb } from 'azle/experimental/_internal/test/property/arbitraries/stable_b_tree_map_arb';
import { Context } from 'azle/experimental/_internal/test/property/arbitraries/types';
import fc from 'fast-check';

import { ContainsKeyTestArb } from './contains_key';
import { GetTestArb } from './get';
import { InsertTestArb } from './insert';
import { IsEmptyTestArb } from './is_empty';
import { ItemsTestArb } from './items';
import { KeysTestArb } from './keys';
import { LenTestArb } from './len';
import { RemoveTestArb } from './remove';
import { ValuesTestArb } from './values';

const context: Context = { constraints: {} };

const StableBTreeMapTestArb = fc
    .array(
        StableBTreeMapArb(context).chain((stableBTreeMap) => {
            return fc
                .tuple(
                    IsEmptyTestArb(stableBTreeMap),
                    InsertTestArb(stableBTreeMap),
                    ContainsKeyTestArb(stableBTreeMap),
                    GetTestArb(stableBTreeMap),
                    ItemsTestArb(stableBTreeMap),
                    KeysTestArb(stableBTreeMap),
                    LenTestArb(stableBTreeMap),
                    ValuesTestArb(stableBTreeMap),
                    RemoveTestArb(stableBTreeMap)
                )
                .map(
                    ([
                        isEmptyTestQueryMethod,
                        insertTestQueryMethod,
                        containsKeyTestQueryMethod,
                        getTestQueryMethod,
                        itemsTestQueryMethod,
                        keysTestQueryMethod,
                        lenTestQueryMethod,
                        valuesTestQueryMethod,
                        removeTestQueryMethod
                    ]) => {
                        return {
                            globalDeclarations: [
                                ...stableBTreeMap.keySample.src
                                    .variableAliasDeclarations,
                                ...stableBTreeMap.valueSample.src
                                    .variableAliasDeclarations,
                                stableBTreeMap.definition
                            ],
                            queryMethods: [],
                            updateMethods: [
                                isEmptyTestQueryMethod,
                                insertTestQueryMethod,
                                containsKeyTestQueryMethod,
                                getTestQueryMethod,
                                itemsTestQueryMethod,
                                keysTestQueryMethod,
                                lenTestQueryMethod,
                                valuesTestQueryMethod,
                                removeTestQueryMethod
                            ] as UpdateMethod<
                                CorrespondingJSType,
                                CorrespondingJSType
                            >[]
                        };
                    }
                );
        }),
        {
            minLength: 10,
            maxLength: 30
        }
    )
    .map((canisterConfigs) => {
        const globalDeclarations = canisterConfigs.flatMap(
            (canisterConfig) => canisterConfig.globalDeclarations
        );

        const queryMethods = canisterConfigs.flatMap(
            (canisterConfig) => canisterConfig.queryMethods
        );

        const updateMethods = canisterConfigs.flatMap(
            (canisterConfig) => canisterConfig.updateMethods
        );

        return {
            globalDeclarations,
            queryMethods,
            updateMethods
        };
    });

runPropTests(CanisterArb(context, StableBTreeMapTestArb));
