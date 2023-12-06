// TODO I need to figure out how to test the stable part of this
// TODO I am not sure I can do that without having the ability to create multiple
// TODO different kinds of methods per test

// TODO it would probably be better to create the StableBTreeMaps globally
// TODO and just have one method for each StableBTreeMap method

// TODO we should test update methods as well...probably mainly

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

const StableBTreeMapTestArb = fc
    .array(
        StableBTreeMapArb.chain((stableBTreeMap) => {
            return fc
                .tuple(
                    ContainsKeyTestArb(stableBTreeMap)
                    // GetTestArb,
                    // IsEmptyTestArb,
                    // ItemsTestArb,
                    // KeysTestArb,
                    // LenTestArb,
                    // RemoveTestArb,
                    // ValuesTestArb
                )
                .map(
                    ([
                        containsKeyTestQueryMethod
                        // getTestQueryMethod,
                        // isEmptyTestQueryMethod,
                        // itemsTestQueryMethod,
                        // keysTestQueryMethod,
                        // lenTestQueryMethod,
                        // removeTestQueryMethod,
                        // valuesTestQueryMethod
                    ]) => {
                        return {
                            globalDeclarations: [stableBTreeMap.body],
                            queryMethods: [
                                containsKeyTestQueryMethod
                                // getTestQueryMethod,
                                // isEmptyTestQueryMethod,
                                // itemsTestQueryMethod,
                                // keysTestQueryMethod,
                                // lenTestQueryMethod,
                                // removeTestQueryMethod,
                                // valuesTestQueryMethod
                            ],
                            updateMethods: []
                        };
                    }
                );
        }),
        {
            minLength: 10,
            maxLength: 50
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
