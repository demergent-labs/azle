import HashMap "mo:base/HashMap";
import Prim "mo:⛔";
import Text "mo:base/Text";

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

  func record_performance(start: Nat64, end: Nat64) {
    perf_result := ?{
      wasm_body_only = end - start;
      wasm_including_prelude = Prim.performanceCounter(0);
    };
  };
  //#endregion

  type Store = HashMap.HashMap<Text, Text>;

  let store: Store = HashMap.HashMap(10, Text.equal, Text.hash);

  public func get(key: Text): async ?Text {
      return store.get(key);
  };

  public func set(key: Text, value: Text): async () {
      let perf_start = Prim.performanceCounter(0);

      store.put(key, value);

      let perf_end = Prim.performanceCounter(0);

      record_performance(perf_start, perf_end);
  };

};
