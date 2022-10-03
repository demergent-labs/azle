import { Query, Variant } from 'azle';

type InlineExample = {
    bad_variant: Variant<boolean>;
};

export function inline_query(param: InlineExample): Query<void> {}
