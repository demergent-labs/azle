import EIC "mo:base/ExperimentalInternetComputer";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor Motoko {
    public query func query_empty(): async Nat64 {
        EIC.countInstructions(func() {});
    };

    public query func query_nat64_add_one(): async Nat64 {
        EIC.countInstructions(func() {
            var num: Nat64 = 0;

            num += 1;

            Debug.print(debug_show(num));
        });
    };

    public query func query_nat64_add_many(): async Nat64 {
        EIC.countInstructions(func() {
            var num: Nat64 = 0;

            for (i in Iter.range(0, 10_000)) {
                num += 1;
            };

            Debug.print(debug_show(num));
        });
    };

    public query func query_string_init(): async Nat64 {
        EIC.countInstructions(func() {
            let string: Text = "hello there sir";

            Debug.print(string);
        });
    };
}