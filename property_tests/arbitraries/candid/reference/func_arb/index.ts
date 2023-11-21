import { Principal } from '@dfinity/principal';

import { CandidTypeArb } from '../../candid_type_arb';
import { FuncArb as Base } from './base';

export type Func = [Principal, string];

export const FuncArb = Base(CandidTypeArb);
