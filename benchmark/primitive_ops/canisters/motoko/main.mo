import EIC "mo:base/ExperimentalInternetComputer";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
import Float "mo:base/Float";
import Blob "mo:base/Blob";
import Prim "mo:⛔";

// TODO I was having trouble splitting this code into modules, mostly getting the modules access to the InitHeapStorage variables
actor Motoko {
    // blob

    type BlobInitHeapStorage = HashMap.HashMap<Text, Blob>;

    let blob_init_heap_storage: BlobInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func blob_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Blob = if (i % 2 == 0) { Blob.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) } else { Blob.fromArray([]) };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func blob_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Blob = if (i % 2 == 0) { Blob.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) } else { Blob.fromArray([]) };
            blob_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // boolean

    type BooleanInitHeapStorage = HashMap.HashMap<Text, Bool>;

    let boolean_init_heap_storage: BooleanInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func boolean_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Bool = if (i % 2 == 0) { true } else { false };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func boolean_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Bool = if (i % 2 == 0) { true } else { false };
            boolean_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // float32

    type Float32InitHeapStorage = HashMap.HashMap<Text, Float>;

    let float32_init_heap_storage: Float32InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func float32_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Float = if (i % 2 == 0) { Float.pi } else { Float.e };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func float32_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Float = if (i % 2 == 0) { Float.pi } else { Float.e };
            float32_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // float64

    type Float64InitHeapStorage = HashMap.HashMap<Text, Float>;

    let float64_init_heap_storage: Float64InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func float64_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Float = if (i % 2 == 0) { Float.pi } else { Float.e };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func float64_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Float = if (i % 2 == 0) { Float.pi } else { Float.e };
            float32_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // int

    type IntInitHeapStorage = HashMap.HashMap<Text, Int>;

    let int_init_heap_storage: IntInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int = if (i % 2 == 0) { 170_141_183_460_469_231_731_687_303_715_884_105_727 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func int_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int = if (i % 2 == 0) { 170_141_183_460_469_231_731_687_303_715_884_105_727 } else { 0 };
            int_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // int8

    type Int8InitHeapStorage = HashMap.HashMap<Text, Int8>;

    let int8_init_heap_storage: Int8InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int8_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int8 = if (i % 2 == 0) { 127 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func int8_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int8 = if (i % 2 == 0) { 127 } else { 0 };
            int8_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // int16

    type Int16InitHeapStorage = HashMap.HashMap<Text, Int16>;

    let int16_init_heap_storage: Int16InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int16_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int16 = if (i % 2 == 0) { 32_767 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func int16_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int16 = if (i % 2 == 0) { 32_767 } else { 0 };
            int16_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // int32

    type Int32InitHeapStorage = HashMap.HashMap<Text, Int32>;

    let int32_init_heap_storage: Int32InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int32_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int32 = if (i % 2 == 0) { 2_147_483_647 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func int32_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int32 = if (i % 2 == 0) { 2_147_483_647 } else { 0 };
            int32_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // int64

    type Int64InitHeapStorage = HashMap.HashMap<Text, Int64>;

    let int64_init_heap_storage: Int64InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int64_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int64 = if (i % 2 == 0) { 2_147_483_647 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func int64_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int64 = if (i % 2 == 0) { 2_147_483_647 } else { 0 };
            int64_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // nat

    type NatInitHeapStorage = HashMap.HashMap<Text, Nat>;

    let nat_init_heap_storage: NatInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat = if (i % 2 == 0) { 340_282_366_920_938_463_463_374_607_431_768_211_455 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func nat_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat = if (i % 2 == 0) { 340_282_366_920_938_463_463_374_607_431_768_211_455 } else { 0 };
            nat_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // nat8

    type Nat8InitHeapStorage = HashMap.HashMap<Text, Nat8>;

    let nat8_init_heap_storage: Nat8InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat8_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat8 = if (i % 2 == 0) { 255 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func nat8_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat8 = if (i % 2 == 0) { 255 } else { 0 };
            nat8_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // nat16

    type Nat16InitHeapStorage = HashMap.HashMap<Text, Nat16>;

    let nat16_init_heap_storage: Nat16InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat16_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat16 = if (i % 2 == 0) { 65_535 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func nat16_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat16 = if (i % 2 == 0) { 65_535 } else { 0 };
            nat16_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // nat32

    type Nat32InitHeapStorage = HashMap.HashMap<Text, Nat32>;

    let nat32_init_heap_storage: Nat32InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat32_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat32 = if (i % 2 == 0) { 4_294_967_295 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func nat32_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat32 = if (i % 2 == 0) { 4_294_967_295 } else { 0 };
            nat32_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    // nat64

    type Nat64InitHeapStorage = HashMap.HashMap<Text, Nat64>;

    let nat64_init_heap_storage: Nat64InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat64_init_stack(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat64 = if (i % 2 == 0) { 18_446_744_073_709_551_615 } else { 0 };
            Debug.print(debug_show(value));
            i += 1;
        };

        return Prim.performanceCounter(0);
    };

    public func nat64_init_heap(num_inits: Nat32): async Nat64 {
        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat64 = if (i % 2 == 0) { 18_446_744_073_709_551_615 } else { 0 };
            nat64_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        return Prim.performanceCounter(0);
    };
}