import { text, Manual } from '../../src/lib';
import { CandidType } from '../../src/lib/candid/candid_type';
import { typeMapping } from '../';

export const TestCandidType: CandidType = Manual(text);

export const TestTypeMapping: void = typeMapping(Manual(text));
