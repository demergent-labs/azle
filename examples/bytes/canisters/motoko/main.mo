import Blob "mo:base/Blob";

actor Motoko {
    public func get_bytes(bytes: Blob): async Blob {
        return bytes;
    };
}