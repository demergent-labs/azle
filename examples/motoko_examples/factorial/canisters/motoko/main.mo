import Prim "mo:⛔";

actor Factorial {
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

  // Calculate the product of all positive integers less than or equal to `n`.
  public func fac(n : Nat) : async Nat {
    let perf_start = Prim.performanceCounter(0);

    // We implement the recursion in a helper function that does not return
    // asynchronously.
    func go(m : Nat) : Nat {
      if (m == 0) {
        return 1;
      } else {
        return m * go(m - 1);
      };
    };

    let factorial = go(n);

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);

    // Return.
    return factorial
  };
};
