import { Test } from '../../test';

export type TestSample = {
    imports: Set<string>;
    candidTypeDeclarations?: string[];
    functionName: string;
    paramNames: string[];
    paramCandidTypes: string;
    returnCandidType: string;
    body: string;
    test: Test;
};
