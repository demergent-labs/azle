// TODO I need to figure out how to test the stable part of this
// TODO I am not sure I can do that without having the ability to create multiple
// TODO different kinds of methods per test

// TODO it would probably be better to create the StableBTreeMaps globally
// TODO and just have one method for each StableBTreeMap method

// TODO we should test update methods as well...probably mainly

import { runPropTests } from '../../../../property_tests';
import { CanisterArb } from '../../../arbitraries/canister_arb';
import { ContainsKeyTestArb } from './contains_key';
import { GetTestArb } from './get';
import { IsEmptyTestArb } from './is_empty';
import { ItemsTestArb } from './items';
import { KeysTestArb } from './keys';
import { LenTestArb } from './len';
import { RemoveTestArb } from './remove';
import { ValuesTestArb } from './values';

// TODO we need to all adding in all of these methods
runPropTests(CanisterArb(ContainsKeyTestArb));

// runPropTests([
//     ContainsKeyTestArb,
//     GetTestArb,
//     IsEmptyTestArb,
//     ItemsTestArb,
//     KeysTestArb,
//     LenTestArb,
//     RemoveTestArb,
//     ValuesTestArb
// ]);
