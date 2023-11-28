import fc from 'fast-check';
import { CandidType } from './candid_type_arb';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type CandidValueAndMeta<T extends CandidType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    src: Src;
};

export type Src = {
    candidType: string;
    typeDeclaration?: string;
    imports: Set<string>;
    valueLiteral: string;
};

export const CandidMetaArb = <T extends CandidType>(
    arb: fc.Arbitrary<T>,
    candidType: string,
    toLiteral: (value: T) => string
) => {
    return arb.map(
        (agentArgumentValue): CandidValueAndMeta<T> => ({
            src: {
                candidType,
                imports: new Set([candidType]),
                valueLiteral: toLiteral(agentArgumentValue)
            },
            agentArgumentValue,
            agentResponseValue: agentArgumentValue
        })
    );
};
