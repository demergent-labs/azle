import { InsertError, Query, Variant, Opt, StableBTreeMap, Update } from 'azle';
import {
    Bling,
    Reaction,
    self,
    Test,
    TestVariant,
    Thing,
    User,
    User1,
    UserVariant
} from './types';

export function inline_record_return_type(): Query<{
    prop1: string;
    prop2: string;
}> {
    return {
        prop1: 'prop1',
        prop2: 'prop2'
    };
}

export function inline_record_param(param: { prop1: string }): Query<string> {
    return param.prop1;
}

export function inline_variant_return_type(): Query<
    Variant<{
        var1: null;
        var2: null;
        var3: null;
    }>
> {
    return {
        var1: null
    };
}

export function inline_variant_param(
    param: Variant<{ var1: null; var2: null }>
): Query<Variant<{ var1: null; var2: null }>> {
    if (param.var1 === null) {
        return {
            var1: null
        };
    } else {
        return {
            var2: null
        };
    }
}

export function record_with_inline_fields(): Query<User1> {
    return {
        id: '0',
        job: {
            id: '0',
            title: 'Software Developer'
        }
    };
}

export function variant_with_inline_fields(): Query<Reaction> {
    return {
        three: {
            id: '0'
        }
    };
}

export function record_referencing_other_types_from_return_type(): Query<{
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

export function variant_referencing_other_types_from_return_type(): Query<
    Variant<{
        prop1: string;
        prop2: Bling;
    }>
> {
    return {
        prop2: {
            id: '0'
        }
    };
}

export function record_referencing_record_from_param(param1: {
    test: Test;
}): Query<string> {
    return param1.test.id;
}

export function record_referencing_variant_from_param(param1: {
    testVariant: TestVariant;
}): Query<Opt<string>> {
    if (param1.testVariant.prop1 !== undefined) {
        return param1.testVariant.prop1;
    }

    return null;
}

export function variant_referencing_record_from_param(
    param1: Variant<{ prop1: User }>
): Query<void> {}

export function variant_referencing_variant_from_param(
    param1: Variant<{ prop1: UserVariant }>
): Query<void> {}

let stable_map = new StableBTreeMap<
    string,
    {
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }
>(0, 100, 100);

export function stable_map_insert(
    key: string,
    value: {
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }
): Update<
    Variant<{
        ok: Opt<{
            variant: Variant<{ var1: null; var2: TestVariant }>;
        }>;
        err: InsertError;
    }>
> {
    return stable_map.insert(key, value);
}

export function stable_map_get(key: string): Query<
    Opt<{
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }>
> {
    return stable_map.get(key);
}

export async function inline_record_return_type_as_external_canister_call(): Promise<
    Update<
        Variant<{
            ok: {
                prop1: string;
                prop2: string;
            };
            err: string;
        }>
    >
> {
    return await self.inline_record_return_type().call();
}
