actor {

  var counter : Nat = 0;

  public func count() : async Nat {
    counter += 1;
    return counter;
  };

  public query func get_count() : async Nat {
    return counter;
  };

  public func reset() : async Nat {
    counter := 0;
    return counter;
  };
};
