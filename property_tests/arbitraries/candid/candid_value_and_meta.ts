import fc from 'fast-check';
import { CorrespondingJSType } from './candid_type_arb';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type CandidValueAndMeta<T extends CorrespondingJSType, E = T> = {
    agentArgumentValue: T;
    agentResponseValue: E;
    src: {
        typeAnnotation: string;
        typeAliasDeclarations: string[];
        imports: Set<string>;
        valueLiteral: string;
    };
};
