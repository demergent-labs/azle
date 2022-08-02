import Prim "mo:⛔";

actor Calc {
  //#region Performance
  type PerfResult = {
    wasm_body_only: Nat64;
    wasm_including_prelude: Nat64;
  };

  var perf_result: ?PerfResult = null;

  public query func get_perf_result(): async ?PerfResult {
    return perf_result;
  };

  func record_performance(start: Nat64, end: Nat64) {
    perf_result := ?{
      wasm_body_only = end - start;
      wasm_including_prelude = Prim.performanceCounter(0);
    };
  };
  //#endregion

  var cell : Int = 0;

  // Add.
  public func add(n : Int) : async Int {
    let perf_start = Prim.performanceCounter(0);

    cell += n;

    let perf_end = Prim.performanceCounter(0);

    record_performance(perf_start, perf_end);

    return cell;
  };

  // Subtract.
  public func sub(n : Int) : async Int {
    let perf_start = Prim.performanceCounter(0);

    cell -= n;

    let perf_end = Prim.performanceCounter(0);

    record_performance(perf_start, perf_end);

    return cell;
  };

  // Multiply.
  public func mul(n : Int) : async Int {
    let perf_start = Prim.performanceCounter(0);

    cell *= n;

    let perf_end = Prim.performanceCounter(0);

    record_performance(perf_start, perf_end);

    return cell;
  };

  // Divide.
  public func div(n : Int) : async ?Int {
    let perf_start = Prim.performanceCounter(0);

    var result: ?Int = null;
    if (n == 0) {
      // 'null' encodes the division by zero error.
      result := null;
    } else {
      cell /= n;
      result := ?cell;
    };

    let perf_end = Prim.performanceCounter(0);

    record_performance(perf_start, perf_end);

    return result;
  };

  // Clear the calculator and reset its cell to zero.
  public func clearall() : async () {
    let perf_start = Prim.performanceCounter(0);

    cell := 0;

    let perf_end = Prim.performanceCounter(0);

    record_performance(perf_start, perf_end);
  };
};
