export type TestSample = {
    imports: string[];
    candidTypeDeclarations?: string[];
    functionName: string;
    paramNames: string[];
    paramCandidTypes: string;
    returnCandidType: string;
    body: string;
    test: any;
};
