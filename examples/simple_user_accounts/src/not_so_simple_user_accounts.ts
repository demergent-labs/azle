import { Record, candid, query, Variant, func, Opt, Vec } from 'azle';
import { Null, int, nat, nat32, text, bool, blob } from 'azle/candid';
import * as Candid from 'azle/candid';

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

    @candid(Candid.Opt(bool))
    myOptBool: Opt<boolean>;

    @candid(Candid.Vec(int))
    myVecInt: Vec<bigint>;
}

export default class {
    @query(['text', text], [text])
    test(param1: string, param2: string): string {
        return param1 + param2;
    }
    @query([text, text], ['text'])
    simpleQuery(param1: string, param2: string): string {
        return param1 + param2;
    }

    @query([MyRecord.getIDL()], [MyRecord.getIDL()])
    echoRecord(record: MyRecord): MyRecord {
        return record;
    }

    @query([Temperature.getIDL()], [Temperature.getIDL()])
    echoVariant(temp: Temperature): Temperature {
        return temp;
    }

    @query([MyFunc.getIDL()], [MyFunc.getIDL()])
    echoFunc(myFunc: MyFunc): MyFunc {
        return myFunc;
    }

    @query([], [])
    returnVoid(): void {
        return;
    }
}
