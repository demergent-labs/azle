import fc from 'fast-check';
import { CandidType } from './candid_type_arb';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type CandidMeta<T extends CandidType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    src: Src;
};

export type Src = {
    candidTypeObject: string;
    candidType: string;
    typeDeclaration?: string;
    imports: Set<string>;
    valueLiteral: string;
};

export const CandidMetaArb = <T extends CandidType>(
    arb: fc.Arbitrary<T>,
    candidTypeObject: string,
    candidType: string,
    toLiteral: (value: T) => string
) => {
    return arb.map(
        (agentArgumentValue): CandidMeta<T> => ({
            src: {
                candidTypeObject,
                candidType,
                imports: new Set([candidTypeObject]),
                valueLiteral: toLiteral(agentArgumentValue)
            },
            agentArgumentValue,
            agentResponseValue: agentArgumentValue
        })
    );
};
