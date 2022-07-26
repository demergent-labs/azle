import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Map "mo:base/HashMap";
import Nat "mo:base/Nat";
import Prim "mo:⛔";
import Text "mo:base/Text";

// Define the actor
actor Assistant {

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

  type ToDo = {
    description: Text;
    completed: Bool;
  };

  func natHash(n : Nat) : Hash.Hash {
    Text.hash(Nat.toText(n))
  };

  var todos = Map.HashMap<Nat, ToDo>(0, Nat.equal, natHash);
  var nextId : Nat = 0;

  public query func get_todos() : async [ToDo] {
    Iter.toArray(todos.vals())
  };

  // Returns the ID that was given to the ToDo item
  public func add_todo(description : Text) : async Nat {
    let perf_start = Prim.performanceCounter(0);

    let id = nextId;
    todos.put(id, { description = description; completed = false });
    nextId += 1;

    let perf_end = Prim.performanceCounter(0);

    record_performance(perf_start, perf_end);

    id
  };

  public func complete_todo(id : Nat) : async () {
    let perf_start = Prim.performanceCounter(0);

    ignore do ? {
      let description = todos.get(id)!.description;
      todos.put(id, { description; completed = true });
    };

    let perf_end = Prim.performanceCounter(0);

    record_performance(perf_start, perf_end);
  };

  public query func show_todos() : async Text {
    var output : Text = "\n___TO-DOs___";
    for (todo : ToDo in todos.vals()) {
      output #= "\n" # todo.description;
      if (todo.completed) { output #= " ✔"; };
    };
    output # "\n";
  };

  public func clear_completed() : async () {
    let perf_start = Prim.performanceCounter(0);

    todos := Map.mapFilter<Nat, ToDo, ToDo>(todos, Nat.equal, natHash,
              func(_, todo) { if (todo.completed) null else ?todo });

    let perf_end = Prim.performanceCounter(0);

    record_performance(perf_start, perf_end);
  };

}
