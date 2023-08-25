import {
    Record,
    candid,
    Null,
    int,
    nat,
    nat32,
    text,
    bool,
    query,
    Variant,
    blob,
    func,
    Opt,
    Vec
} from 'azle';

@func([text, text], int, 'query')
class MyFunc {}

class Temperature extends Variant {
    @candid('null')
    Cool?: bigint;

    @candid(int)
    Warm?: bigint;

    @candid(nat)
    Hot?: bigint;

    @candid(Null)
    Cold?: bigint;
}

class MyRecord extends Record {
    @candid(int)
    myInt: bigint;

    @candid(nat32)
    myNat32: number;

    @candid(text)
    myText: string;

    @candid(bool)
    myBool: boolean;

    @candid(blob)
    myBlob: number[];

    @candid(Opt(bool))
    myOptBool;

    @candid(Vec(int))
    myVecInt;
}

export default class {
    @query(['text', text], text)
    test(param1: string, param2: string): string {
        return param1 + param2;
    }
    @query([text, text], 'text')
    simpleQuery(param1: string, param2: string): string {
        return param1 + param2;
    }

    @query([MyRecord.getIDL()], MyRecord.getIDL())
    echoRecord(record: MyRecord): MyRecord {
        return record;
    }

    @query([Temperature.getIDL()], Temperature.getIDL())
    echoVariant(temp: Temperature): Temperature {
        return temp;
    }

    @query([MyFunc.getIDL()], MyFunc.getIDL())
    echoFunc(myFunc: MyFunc): MyFunc {
        return myFunc;
    }
}
