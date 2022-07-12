actor Update {
  var currentMessage = "";

  // query is a reserved word and therefore cannot be a function name
  public query func query1() : async Text {
    return currentMessage;
  };

  public func update(message : Text) : async () {
    currentMessage := message;
  };
};
