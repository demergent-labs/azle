import { Opt, text } from '../../../src/lib';
import { CandidType } from '../../../src/lib/candid/candid_type';

export const TestOpt: CandidType = Opt(text);
