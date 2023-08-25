import {
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
    Void
} from 'azle';

@func([text, text], int, 'query')
class MyFunc {}

@func([text, bool], int, 'update')
class NewFunc {}

@variant
class Temperature {
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
class MySimpleRecord {
    @candid(int)
    myInt: int;
}

@record
class MyRecord {
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
    @query([], [])
    returnVoid(): Void {
        return;
    }
    @query([], int)
    returnInt(): int {
        let thing = new MySimpleRecord({ myInt: 3n });
        return thing.myInt;
    }
}
