import {
    Record,
    candid,
    candidNull,
    int,
    nat32,
    text,
    bool,
    query,
    Variant
} from 'azle';

class Temperature extends Variant {
    @candid(candidNull)
    Cool?: bigint;

    @candid(candidNull)
    Warm?: bigint;

    @candid(candidNull)
    Hot?: bigint;

    @candid(candidNull)
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
}

export default class {
    @query([text, text], text)
    test(param1: string, param2: string): string {
        return param1 + param2;
    }
    @query([text, text], text)
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
}
