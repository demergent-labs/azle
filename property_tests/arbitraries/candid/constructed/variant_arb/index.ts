import {
    CandidDefinitionArb,
    CorrespondingJSType
} from '../../candid_type_arb';
import { VariantArb as Base } from './base';

export type Variant = {
    [x: string]: CorrespondingJSType;
};

export const VariantArb = Base(CandidDefinitionArb);
