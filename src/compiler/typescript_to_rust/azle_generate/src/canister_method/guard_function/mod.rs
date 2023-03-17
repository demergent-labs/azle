use cdk_framework::act::{node::GuardFunction, CanisterMethods};

use crate::TsAst;

impl TsAst {
    pub fn build_guard_functions(&self, canister_methods: &CanisterMethods) -> Vec<GuardFunction> {
        // TODO: See https://github.com/demergent-labs/azle/issues/859

        // let guard_function_names = get_guard_function_names(canister_methods);
        // TODO: Ideally we'd know which file the canister method was declared in and only look in
        // that file for a method with the same name. If we have a.ts and b.ts and a.ts has a
        // canister method that references method_a, and we find it in both a.ts and b.ts we should
        // know that we want the one from a.ts not b.ts.

        // TODO: This should likely reduce duplication in the list of names. If in file a.ts we have
        // two canister methods that both use the guard function "some_guard", then our list should
        // only contain "some_guard" once. If a.ts and b.ts both have that same function though then
        // we should probably not de-duplicate and we should make a function for each

        // I think we don't have enough information here.

        // Go through all module_items in all programs/modules and look for methods with the same name

        // We can either take each name in the list and go through all the module items looking for
        // a method with a corresponding name. In a list of size n that requires n passes through
        // all the module items.

        // Alternatively we can go through the module items once and if the name matches...

        // TODO: MORE DESIGN NEEDED BEFORE BEING ABLE TO PROCEED!!!

        vec![]
    }
}
