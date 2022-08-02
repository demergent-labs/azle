import Map "mo:base/HashMap";
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

  type Name = Text;
  type Phone = Text;

  type Entry = {
    desc: Text;
    phone: Phone;
  };

  let phonebook = Map.HashMap<Name, Entry>(0, Text.equal, Text.hash);

  public func insert(name : Name, entry : Entry): async () {
    let perf_start = Prim.performanceCounter(0);

    phonebook.put(name, entry);

    let perf_end = Prim.performanceCounter(0);

    record_performance(perf_start, perf_end);
  };

  public query func lookup(name : Name) : async ?Entry {
    phonebook.get(name)
  };
};
