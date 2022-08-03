import Int "mo:base/Int";
import Prim "mo:⛔";
import Quicksort "Quicksort";

actor Main {
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


  // Sort an array of integers.
  public func sort(xs : [Int]) : async [Int] {
    let perf_start = Prim.performanceCounter(0);

    let sorted_array = Quicksort.sortBy(xs, Int.compare);

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);

    return sorted_array;
  };
};
