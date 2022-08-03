import Prim "mo:⛔";
import Principal "mo:base/Principal";

shared (install) actor class WhoAmI(someone : Principal) =
  this { // Bind the optional `this` argument (any name will do)

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

  // Return the principal identifier of the wallet canister that installed this
  // canister.
  public query func installer() : async Principal {
    return install.caller;
  };

  // Return the principal identifier that was provided as an installation
  // argument to this canister.
  public query func argument() : async Principal {
    return someone;
  };

  // Return the principal identifier of the caller of this method.
  public shared (message) func whoami() : async Principal {
    let perf_start = Prim.performanceCounter(0);

    let caller = message.caller;

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);

    return caller;
  };

  // Return the principal identifier of this canister.
  public func id() : async Principal {
    let pre_xnet_call_perf_start = Prim.performanceCounter(0);
    let pre_xnet_call_perf_end = Prim.performanceCounter(0);

    let response = await whoami();

    let post_xnet_call_perf_start = Prim.performanceCounter(0);
    let post_xnet_call_perf_end = Prim.performanceCounter(0);
    let pre_xnet_call_perf = pre_xnet_call_perf_end - pre_xnet_call_perf_start;
    let post_xnet_call_perf = post_xnet_call_perf_end - post_xnet_call_perf_start;
    let total_perf = pre_xnet_call_perf + post_xnet_call_perf;
    perf_result := ?{
      wasm_body_only = total_perf;
      wasm_including_prelude = Prim.performanceCounter(0);
    };

    return response;
  };

  // Return the principal identifier of this canister via the optional `this` binding.
  // This is much quicker than `id()` above, since it avoids the latency of `await whoami()`.
  public func id_quick() : async Principal {
    return Principal.fromActor(this);
  };
};
