import {
    ic,
    candid,
    query,
    func,
    Opt,
    Vec,
    Null,
    int,
    nat,
    nat32,
    text,
    bool,
    blob,
    record,
    variant,
    Void,
    Record,
    Variant,
    nat64,
    update,
    nat8
} from 'azle';

@func([text, text], int, 'query')
class MyFunc {}

@func([text, bool], int, 'update')
class NewFunc {}

@variant
class Temperature extends Variant {
    @candid(Null)
    Cool?: Null;

    @candid(int)
    Warm?: int;

    @candid(nat)
    Hot?: nat;

    @candid(Null)
    Cold?: Null;
}

@record
class MySimpleRecord extends Record {
    @candid(int)
    myInt: int;
}

@record
class MyRecord extends Record {
    @candid(int)
    myInt: int;

    @candid(nat32)
    myNat32: nat32;

    @candid(text)
    myText: text;

    @candid(bool)
    myBool: bool;

    @candid(blob)
    myBlob: blob;

    @candid(Opt(bool))
    myOptBool: Opt<boolean>;

    @candid(Vec(int))
    myVecInt: Vec<bigint>;
}

export default class {
    @query([text, text], text)
    test(param1: text, param2: text): text {
        return param1 + param2;
    }
    @query([text, text], text)
    simpleQuery(param1: text, param2: text): text {
        return param1 + param2;
    }
    @query([MyRecord], MyRecord)
    echoRecord(record: MyRecord): MyRecord {
        return record;
    }
    @query([MySimpleRecord], MySimpleRecord)
    echoSimpleRecord(record: MySimpleRecord): MySimpleRecord {
        return record;
    }
    @query([Temperature], Temperature)
    echoVariant(temp: Temperature): Temperature {
        return temp;
    }
    @query([MyFunc], MyFunc)
    echoFunc(myFunc: MyFunc): MyFunc {
        console.log(myFunc);
        return myFunc;
    }
    @query([], NewFunc)
    returnFunc(): NewFunc {
        return [];
    }
    @query([], Void)
    returnVoid(): Void {
        return;
    }
    @query([text], Void)
    returnTrap(message: text): Void {
        ic.trap(message);
        return;
    }
    @query([], nat64)
    returnTime(): nat64 {
        return ic.time();
    }
    @update([], [])
    stableWrite(): Void {
        ic.stableWrite(0, new Uint8Array([0, 1, 2, 3, 4]));
    }
    @update([], [])
    stable64Write(): Void {
        ic.stable64Write(0n, new Uint8Array([0, 1, 2, 3, 4]));
    }
    @update([], [])
    setCertData(): Void {
        ic.setCertifiedData(new Uint8Array([1, 2, 3]));
    }
    @query([], blob)
    stableBytes(): blob {
        return ic.stableBytes();
    }
    @query([], blob)
    stableRead(): blob {
        return ic.stableRead(0, 1);
    }
    @query([], blob)
    stable64Read(): blob {
        return ic.stable64Read(0n, 1n);
    }
    @update([], nat32)
    stableGrow(): nat32 {
        return ic.stableGrow(10);
    }
    @update([], nat64)
    stable64Grow(): nat64 {
        return ic.stable64Grow(10n);
    }
    @update([], nat32)
    stableSize(): nat32 {
        return ic.stableSize();
    }
    @update([], nat64)
    stable64Size(): nat64 {
        return ic.stable64Size();
    }
    @query([], int)
    returnInt(): int {
        let thing = new MySimpleRecord({ myInt: 3n });
        return thing.myInt;
    }
}
