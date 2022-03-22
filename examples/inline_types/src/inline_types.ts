import {
    Query,
    Variant,
    Opt
} from 'azle';

type User1 = {
    id: string;
    job: {
        id: string;
        title: string;
    };
};

type Reaction = Variant<{
    one?: null;
    two?: null;
    three?: {
        id: string;
    };
}>;

type Thing = {
    id: string;
};

type Bling = {
    id: string;
};

type Test = {
    id: string;
};

type Test1 = {
    id: string;
};

type User = {
    id: string;
};

type UserVariant = Variant<{
    prop1?: null;
}>;

type TestVariant = Variant<{
    prop1?: string;
    prop2?: Test1;
}>;

export function inlineRecordReturnType(): Query<{
    prop1: string;
    prop2: string;
}> {
    return {
        prop1: 'prop1',
        prop2: 'prop2'
    };
}

export function inlineRecordParam(param: { prop1: string }): Query<string> {
    return param.prop1;
}

export function inlineVariantReturnType(): Query<Variant<{
    var1?: null;
    var2?: null;
    var3?: null
}>> {
    return {
        var1: null
    };
}

export function inlineVariantParam(param: Variant<{ var1?: null; var2?: null }>): Query<Variant<{ var1?: null; var2?: null }>> {
    if (param.var1 === null) {
        return {
            var1: null
        };
    }
    else {
        return {
            var2: null
        };
    }
}

export function recordWithInlineFields(): Query<User1> {
    return {
        id: '0',
        job: {
            id: '0',
            title: 'Software Developer'
        }
    };
}

export function variantWithInlineFields(): Query<Reaction> {
    return {
        three: {
            id: '0'
        }
    };
}

export function recordReferencingOtherTypesFromReturnType(): Query<{
    prop1: string;
    prop2: Thing;
}> {
    return {
        prop1: 'prop1',
        prop2: {
            id: '0'
        }
    };
}

export function variantReferencingOtherTypesFromReturnType(): Query<Variant<{
    prop1?: string;
    prop2?: Bling;
}>> {
    return {
        prop2: {
            id: '0'
        }
    };
}

export function recordReferencingRecordFromParam(param1: { test: Test }): Query<string> {
    return param1.test.id;
}

export function recordReferencingVariantFromParam(param1: { testVariant: TestVariant }): Query<Opt<string>> {
    if (param1.testVariant.prop1 !== undefined) {
        return param1.testVariant.prop1;
    }

    return null;
}

export function variantReferencingRecordFromParam(param1: Variant<{ prop1?: User }>): Query<void> {

}

export function variantReferencingVariantFromParam(param1: Variant<{ prop1?: UserVariant }>): Query<void> {

}