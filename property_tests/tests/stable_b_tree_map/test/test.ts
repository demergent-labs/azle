import fc from 'fast-check';

import { runPropTests } from '../../../../property_tests';
import { CanisterArb } from '../../../arbitraries/canister_arb';
import { StableBTreeMapArb } from '../../../arbitraries/stable_b_tree_map_arb';
import { ContainsKeyTestArb } from './contains_key';
import { GetTestArb } from './get';
import { IsEmptyTestArb } from './is_empty';
import { ItemsTestArb } from './items';
import { KeysTestArb } from './keys';
import { LenTestArb } from './len';
import { RemoveTestArb } from './remove';
import { ValuesTestArb } from './values';
import { InsertTestArb } from './insert';

const StableBTreeMapTestArb = fc
    .array(
        StableBTreeMapArb.chain((stableBTreeMap) => {
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
                            ]
                        };
                    }
                );
        }),
        {
            minLength: 20,
            maxLength: 100
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

runPropTests(CanisterArb(StableBTreeMapTestArb));
