import Prim "mo:⛔";

actor Update {
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

  var currentMessage = "";

  // query is a reserved word and therefore cannot be a function name
  public query func get_current_message() : async Text {
    return currentMessage;
  };

  public func update(message : Text) : async () {
    let perf_start = Prim.performanceCounter(0);

    currentMessage := message;

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);
  };
};
