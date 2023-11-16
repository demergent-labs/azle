import { CandidType, CandidTypeArb } from '../../candid_type_arb';
import { BaseVariantArb } from './base';

export type Variant = {
    [x: string]: CandidType;
};

export const VariantArb = BaseVariantArb(CandidTypeArb);
