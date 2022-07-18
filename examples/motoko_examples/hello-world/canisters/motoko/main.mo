import Debug "mo:base/Debug"

actor HelloWorld {
  public query func main(): async () {
    Debug.print("Hello World!")
  }
}
