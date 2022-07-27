import Blob "mo:base/Blob";
import Prim "mo:⛔";

actor Motoko {
    type PerfResult = {
        wasm_body_only: Nat64;
        wasm_including_prelude: Nat64;
    };

    var perf_result: ?PerfResult = null;

    public query func get_perf_result(): async ?PerfResult {
        return perf_result;
    };

    public func get_bytes(bytes: Blob): async Blob {
        let perf_start = Prim.performanceCounter(0);
        let perf_end = Prim.performanceCounter(0);

        perf_result := ?{
            wasm_body_only = perf_end - perf_start;
            wasm_including_prelude = Prim.performanceCounter(0);
        };

        return bytes;
    };
}