import { VecArb as Base } from './base';
import { CandidDefinitionArb } from '../../candid_definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';

export type Vec =
    | CorrespondingJSType[]
    | Uint16Array
    | Uint32Array
    | Uint8Array
    | Int16Array
    | Int32Array
    | Int8Array
    | BigUint64Array
    | BigInt64Array;

// TODO we have a big problem here. If we try to make a vec of CandidTypeArb you
// get a vec of multiple different types of candidTypeArbs, doing it this way
// makes it so you for sure have a homogeneous vec... but it doesn't benefit
// from code reuse
// The Problem goes even deeper than we first thought. If you pass in something
// like an opt for example, Opt gets an arbitrary inner value, so every index in
// the array will be an opt with a different inner value, so instead of having a
// homogenous vec of opt nat16 you will get a vec of opt nat16 and opt int and
// opt bool etc
export const VecArb = Base(CandidDefinitionArb);
