export type TestSample = {
    functionName: string;
    imports: string[];
    candidTypeDeclarations?: string[];
    paramCandidTypes: string;
    returnCandidType: string;
    paramNames: string[];
    body: string;
    test: any;
};
