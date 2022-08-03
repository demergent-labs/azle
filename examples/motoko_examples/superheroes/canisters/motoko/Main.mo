import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Prim "mo:⛔";

actor Superheroes {
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


  /**
   * Types
   */

  // The type of a superhero identifier.
  public type SuperheroId = Nat32;

  // The type of a superhero.
  public type Superhero = {
    name : Text;
    superpowers : List.List<Text>;
  };

  /**
   * Application State
   */

  // The next available superhero identifier.
  private stable var next : SuperheroId = 0;

  // The superhero data store.
  private stable var superheroes : Trie.Trie<SuperheroId, Superhero> = Trie.empty();

  /**
   * High-Level API
   */

  // Create a superhero.
  public func create(superhero : Superhero) : async SuperheroId {
    let perf_start = Prim.performanceCounter(0);

    let superheroId = next;
    next += 1;
    superheroes := Trie.replace(
      superheroes,
      key(superheroId),
      Nat32.equal,
      ?superhero,
    ).0;

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);
    return superheroId;
  };

  // Read a superhero.
  public query func read(superheroId : SuperheroId) : async ?Superhero {
    let result = Trie.find(superheroes, key(superheroId), Nat32.equal);
    return result;
  };

  // Update a superhero.
  public func update(superheroId : SuperheroId, superhero : Superhero) : async Bool {
    let perf_start = Prim.performanceCounter(0);

    let result = Trie.find(superheroes, key(superheroId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      superheroes := Trie.replace(
        superheroes,
        key(superheroId),
        Nat32.equal,
        ?superhero,
      ).0;
    };

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);

    return exists;
  };

  // Delete a superhero.
  public func delete_hero(superheroId : SuperheroId) : async Bool {
    let perf_start = Prim.performanceCounter(0);

    let result = Trie.find(superheroes, key(superheroId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      superheroes := Trie.replace(
        superheroes,
        key(superheroId),
        Nat32.equal,
        null,
      ).0;
    };

    let perf_end = Prim.performanceCounter(0);
    record_performance(perf_start, perf_end);

    return exists;
  };

  /**
   * Utilities
   */

  // Create a trie key from a superhero identifier.
  private func key(x : SuperheroId) : Trie.Key<SuperheroId> {
    return { hash = x; key = x };
  };
};
