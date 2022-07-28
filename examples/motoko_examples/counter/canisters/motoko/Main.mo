import Prim "mo:⛔";

actor Counter {
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

  stable var counter = 0;

  // Get the value of the counter.
  public query func get() : async Nat {
    return counter;
  };

  // Set the value of the counter.
  public func set(n : Nat) : async () {
    let perf_start = Prim.performanceCounter(0);

    counter := n;

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);
  };

  // Increment the value of the counter.
  public func inc() : async () {
    let perf_start = Prim.performanceCounter(0);

    counter += 1;

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);
  };
};
