import { CorrespondingJSType, CandidTypeArb } from '../../candid_type_arb';
import { BaseVariantArb } from './base';

export type Variant = {
    [x: string]: CorrespondingJSType;
};

export const VariantArb = BaseVariantArb(CandidTypeArb);
