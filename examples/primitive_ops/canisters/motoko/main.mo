import Prim "mo:⛔";
import Blob "mo:base/Blob";
import EIC "mo:base/ExperimentalInternetComputer";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Nat32 "mo:base/Nat32";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

// TODO I was having trouble splitting this code into modules, mostly getting the modules access to the InitHeapStorage variables
actor Motoko {
    type PerfResult = {
        wasm_body_only: Nat64;
        wasm_including_prelude: Nat64;
    };

    public func empty(): async PerfResult {
        let perf_start =  Prim.performanceCounter(0);
        let perf_end =  Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // blob

    type BlobInitHeapStorage = HashMap.HashMap<Text, Blob>;

    let blob_init_heap_storage: BlobInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func blob_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Blob = if (i % 2 == 0) { Blob.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) } else { Blob.fromArray([]) };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func blob_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Blob = if (i % 2 == 0) { Blob.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) } else { Blob.fromArray([]) };
            blob_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // boolean

    type BooleanInitHeapStorage = HashMap.HashMap<Text, Bool>;

    let boolean_init_heap_storage: BooleanInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func boolean_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Bool = if (i % 2 == 0) { true } else { false };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func boolean_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Bool = if (i % 2 == 0) { true } else { false };
            boolean_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // float32

    type Float32InitHeapStorage = HashMap.HashMap<Text, Float>;

    let float32_init_heap_storage: Float32InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func float32_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Float = if (i % 2 == 0) { Float.pi } else { Float.e };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func float32_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Float = if (i % 2 == 0) { Float.pi } else { Float.e };
            float32_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // float64

    type Float64InitHeapStorage = HashMap.HashMap<Text, Float>;

    let float64_init_heap_storage: Float64InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func float64_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Float = if (i % 2 == 0) { Float.pi } else { Float.e };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func float64_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Float = if (i % 2 == 0) { Float.pi } else { Float.e };
            float32_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // int

    type IntInitHeapStorage = HashMap.HashMap<Text, Int>;

    let int_init_heap_storage: IntInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int = if (i % 2 == 0) { 170_141_183_460_469_231_731_687_303_715_884_105_727 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func int_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int = if (i % 2 == 0) { 170_141_183_460_469_231_731_687_303_715_884_105_727 } else { 0 };
            int_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // int8

    type Int8InitHeapStorage = HashMap.HashMap<Text, Int8>;

    let int8_init_heap_storage: Int8InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int8_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int8 = if (i % 2 == 0) { 127 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func int8_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int8 = if (i % 2 == 0) { 127 } else { 0 };
            int8_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // int16

    type Int16InitHeapStorage = HashMap.HashMap<Text, Int16>;

    let int16_init_heap_storage: Int16InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int16_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int16 = if (i % 2 == 0) { 32_767 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func int16_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int16 = if (i % 2 == 0) { 32_767 } else { 0 };
            int16_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // int32

    type Int32InitHeapStorage = HashMap.HashMap<Text, Int32>;

    let int32_init_heap_storage: Int32InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int32_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int32 = if (i % 2 == 0) { 2_147_483_647 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func int32_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int32 = if (i % 2 == 0) { 2_147_483_647 } else { 0 };
            int32_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // int64

    type Int64InitHeapStorage = HashMap.HashMap<Text, Int64>;

    let int64_init_heap_storage: Int64InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func int64_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int64 = if (i % 2 == 0) { 2_147_483_647 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func int64_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Int64 = if (i % 2 == 0) { 2_147_483_647 } else { 0 };
            int64_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // nat

    type NatInitHeapStorage = HashMap.HashMap<Text, Nat>;

    let nat_init_heap_storage: NatInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat = if (i % 2 == 0) { 340_282_366_920_938_463_463_374_607_431_768_211_455 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func nat_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat = if (i % 2 == 0) { 340_282_366_920_938_463_463_374_607_431_768_211_455 } else { 0 };
            nat_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // nat8

    type Nat8InitHeapStorage = HashMap.HashMap<Text, Nat8>;

    let nat8_init_heap_storage: Nat8InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat8_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat8 = if (i % 2 == 0) { 255 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func nat8_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat8 = if (i % 2 == 0) { 255 } else { 0 };
            nat8_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // nat16

    type Nat16InitHeapStorage = HashMap.HashMap<Text, Nat16>;

    let nat16_init_heap_storage: Nat16InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat16_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat16 = if (i % 2 == 0) { 65_535 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func nat16_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat16 = if (i % 2 == 0) { 65_535 } else { 0 };
            nat16_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // nat32

    type Nat32InitHeapStorage = HashMap.HashMap<Text, Nat32>;

    let nat32_init_heap_storage: Nat32InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat32_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat32 = if (i % 2 == 0) { 4_294_967_295 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func nat32_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat32 = if (i % 2 == 0) { 4_294_967_295 } else { 0 };
            nat32_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // nat64

    type Nat64InitHeapStorage = HashMap.HashMap<Text, Nat64>;

    let nat64_init_heap_storage: Nat64InitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func nat64_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat64 = if (i % 2 == 0) { 18_446_744_073_709_551_615 } else { 0 };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func nat64_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Nat64 = if (i % 2 == 0) { 18_446_744_073_709_551_615 } else { 0 };
            nat64_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // null

    type NullInitHeapStorage = HashMap.HashMap<Text, Null>;

    let null_init_heap_storage: NullInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func null_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Null = if (i % 2 == 0) { null } else { null };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func null_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Null = if (i % 2 == 0) { null } else { null };
            null_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // opt

    type OptInitHeapStorage = HashMap.HashMap<Text, ?Bool>;

    let opt_init_heap_storage: OptInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func opt_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: ?Bool = if (i % 2 == 0) { ?(true) } else { null };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func opt_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: ?Bool = if (i % 2 == 0) { ?(true) } else { null };
            opt_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // principal

    type PrincipalInitHeapStorage = HashMap.HashMap<Text, Principal>;

    let principal_init_heap_storage: PrincipalInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func principal_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Principal = if (i % 2 == 0) { Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai") } else { Principal.fromText("aaaaa-aa") };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func principal_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Principal = if (i % 2 == 0) { Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai") } else { Principal.fromText("aaaaa-aa") };
            principal_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // record

    type User = {
        principal: Principal;
        age: Nat32;
        deceased: Bool;
        dna: Blob;
        height: Float;
        username: Text;
    };

    type RecordInitHeapStorage = HashMap.HashMap<Text, User>;

    let record_init_heap_storage: RecordInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func record_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: User = if (i % 2 == 0) { {
                principal = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
                age = 43;
                deceased = false;
                dna = Blob.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                height = 6.25;
                username = "djohn";
            } } else { {
                principal = Principal.fromText("aaaaa-aa");
                age = 123;
                deceased = true;
                dna = Blob.fromArray([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
                height = 5.45;
                username = "gramps";
            } };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func record_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: User = if (i % 2 == 0) { {
                principal = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
                age = 43;
                deceased = false;
                dna = Blob.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                height = 6.25;
                username = "djohn";
            } } else { {
                principal = Principal.fromText("aaaaa-aa");
                age = 123;
                deceased = true;
                dna = Blob.fromArray([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
                height = 5.45;
                username = "gramps";
            } };
            record_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // text

    type TextInitHeapStorage = HashMap.HashMap<Text, Text>;

    let text_init_heap_storage: TextInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func text_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Text = if (i % 2 == 0) { "hello" } else { "" };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func text_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Text = if (i % 2 == 0) { "hello" } else { "" };
            text_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // variant

    type Reaction = {
        #Bad;
        #Good;
        #ThumbsUp: Nat32;
        #Tip: Principal;
    };

    type VariantInitHeapStorage = HashMap.HashMap<Text, Reaction>;

    let variant_init_heap_storage: VariantInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func variant_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Reaction = if (i % 2 == 0) { #ThumbsUp(2) } else { #Good };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func variant_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: Reaction = if (i % 2 == 0) { #ThumbsUp(2) } else { #Good };
            variant_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    // vec

    type VecInitHeapStorage = HashMap.HashMap<Text, [Nat32]>;

    let vec_init_heap_storage: VecInitHeapStorage = HashMap.HashMap(32, Text.equal, Text.hash);

    public func vec_init_stack(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: [Nat32] = if (i % 2 == 0) { [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } else { [] };
            // TODO std::convert::identity(value); consider something like Rust to ensure the value assignment above is never optimized away
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };

    public func vec_init_heap(num_inits: Nat32): async PerfResult {
        let perf_start = Prim.performanceCounter(0);

        var i: Nat32 = 0;

        while (i < num_inits) {
            let value: [Nat32] = if (i % 2 == 0) { [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] } else { [] };
            vec_init_heap_storage.put("element" # Nat32.toText(i), value);
            i += 1;
        };

        let perf_end = Prim.performanceCounter(0);

        return {
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };
    };
}