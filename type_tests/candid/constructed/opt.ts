import { Opt, text } from 'azle';
import { CandidType } from '../../../src/lib/candid/candid_type';

export const TestOpt: CandidType = Opt(text);
