import Prim "mo:⛔";

actor {
  //#region Performance
  type PerfResult = {
    wasm_body_only: Nat64;
    wasm_including_prelude: Nat64;
  };

  var perf_result: ?PerfResult = null;

  public query func get_perf_result(): async ?PerfResult {
    return perf_result;
  };

  func record_performance(start: Nat64, end: Nat64) : () {
    perf_result := ?{
      wasm_body_only = end - start;
      wasm_including_prelude = Prim.performanceCounter(0);
    };
  };
  //#endregion

  var counter : Nat = 0;

  public func count() : async Nat {
    let perf_start = Prim.performanceCounter(0);

    counter += 1;

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);

    return counter;
  };

  public query func get_count() : async Nat {
    return counter;
  };

  public func reset() : async Nat {
    let perf_start = Prim.performanceCounter(0);

    counter := 0;

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);

    return counter;
  };
};
