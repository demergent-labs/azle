import { nat8, nat16, text, Vec } from 'azle';
import { CandidType } from '../../../src/lib/candid/candid_type';
import { typeMapping } from '../..';

// TODO probably test Vec with lots of things like record
export const TestCandidType: CandidType = Vec(text);

export const TestVecNat8: Uint8Array = typeMapping(Vec(nat8));
export const TestVecNat16: Uint16Array = typeMapping(Vec(nat16));
