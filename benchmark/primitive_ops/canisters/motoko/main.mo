// TODO Once Motoko can do something like EIC.performance_counter(0) we should do that: https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027/10?u=lastmjs

import EIC "mo:base/ExperimentalInternetComputer";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";

// TODO there is now way that I know of to nicely split up this code into modules, since in Motoko
// TODO the actor's public methods are the only thing exposed as the canister API
actor Motoko {    
    // boolean

    type BooleanInitHeapStorage = HashMap.HashMap<Text, Bool>;

    let boolean_init_heap_storage: BooleanInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func boolean_init_stack(num_inits: Nat32): async Nat64 {
        return EIC.countInstructions(func() {
            var i: Nat32 = 0;

            while (i < num_inits) {
                let value = if (i % 2 == 0) { true } else { false };
                Debug.print(debug_show(value));
                i += 1;
            }
        });
    };

    public func boolean_init_heap(num_inits: Nat32): async Nat64 {
        return EIC.countInstructions(func() {
            var i: Nat32 = 0;

            while (i < num_inits) {
                let value = if (i % 2 == 0) { true } else { false };
                boolean_init_heap_storage.put("bool" # Nat32.toText(i), value);
                i += 1;
            }
        });
    };

    // nat

    type NatInitHeapStorage = HashMap.HashMap<Text, Nat>;

    let nat_init_heap_storage: NatInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat_init_stack(num_inits: Nat32): async Nat64 {
        return EIC.countInstructions(func() {
            var i: Nat32 = 0;

            while (i < num_inits) {
                let value: Nat = if (i % 2 == 0) { 340_282_366_920_938_463_463_374_607_431_768_211_455 } else { 0 };
                Debug.print(debug_show(value));
                i += 1;
            }
        });
    };

    public func nat_init_heap(num_inits: Nat32): async Nat64 {
        return EIC.countInstructions(func() {
            var i: Nat32 = 0;

            while (i < num_inits) {
                let value: Nat = if (i % 2 == 0) { 340_282_366_920_938_463_463_374_607_431_768_211_455 } else { 0 };
                nat_init_heap_storage.put("nat" # Nat32.toText(i), value);
                i += 1;
            }
        });
    };

    // int

    type IntInitHeapStorage = HashMap.HashMap<Text, Int>;

    let int_init_heap_storage: IntInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int_init_stack(num_inits: Nat32): async Nat64 {
        return EIC.countInstructions(func() {
            var i: Nat32 = 0;

            while (i < num_inits) {
                let value: Int = if (i % 2 == 0) { 170_141_183_460_469_231_731_687_303_715_884_105_727 } else { 0 };
                Debug.print(debug_show(value));
                i += 1;
            }
        });
    };

    public func int_init_heap(num_inits: Nat32): async Nat64 {
        return EIC.countInstructions(func() {
            var i: Nat32 = 0;

            while (i < num_inits) {
                let value: Int = if (i % 2 == 0) { 170_141_183_460_469_231_731_687_303_715_884_105_727 } else { 0 };
                int_init_heap_storage.put("int" # Nat32.toText(i), value);
                i += 1;
            }
        });
    };
}