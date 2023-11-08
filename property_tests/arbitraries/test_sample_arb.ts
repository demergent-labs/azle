import { Test } from '../../test';

export type QueryMethodBlueprint = {
    imports: Set<string>;
    candidTypeDeclarations?: string[];
    functionName: string;
    paramNames: string[];
    paramCandidTypes: string;
    returnCandidType: string;
    body: string;
    tests: Test[];
};
