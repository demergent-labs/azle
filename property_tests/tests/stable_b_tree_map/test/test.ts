// TODO I need to figure out how to test the stable part of this
// TODO I am not sure I can do that without having the ability to create multiple
// TODO different kinds of methods per test

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
                    InsertTestArb(stableBTreeMap),
                    ContainsKeyTestArb(stableBTreeMap),
                    GetTestArb(stableBTreeMap),
                    IsEmptyTestArb(stableBTreeMap),
                    ItemsTestArb(stableBTreeMap),
                    KeysTestArb(stableBTreeMap),
                    LenTestArb(stableBTreeMap),
                    RemoveTestArb(stableBTreeMap),
                    ValuesTestArb(stableBTreeMap)
                )
                .map(
                    ([
                        containsKeyTestQueryMethod,
                        getTestQueryMethod,
                        isEmptyTestQueryMethod,
                        itemsTestQueryMethod,
                        keysTestQueryMethod,
                        lenTestQueryMethod,
                        removeTestQueryMethod,
                        valuesTestQueryMethod
                    ]) => {
                        return {
                            globalDeclarations: [
                                stableBTreeMap.body,
                                ...stableBTreeMap.param0.src
                                    .variableAliasDeclarations,
                                ...stableBTreeMap.param1.src
                                    .variableAliasDeclarations
                            ],
                            queryMethods: [],
                            updateMethods: [
                                containsKeyTestQueryMethod,
                                getTestQueryMethod,
                                isEmptyTestQueryMethod,
                                itemsTestQueryMethod,
                                keysTestQueryMethod,
                                lenTestQueryMethod,
                                removeTestQueryMethod,
                                valuesTestQueryMethod
                            ]
                        };
                    }
                );
        }),
        {
            minLength: 1,
            maxLength: 20
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
