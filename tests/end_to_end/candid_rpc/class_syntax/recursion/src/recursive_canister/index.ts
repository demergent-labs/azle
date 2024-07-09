import { IDL, init, query } from 'azle';

import { MyCanister } from './types';

let myMessage = '';

export default class {
    @init([IDL.Text])
    init(message: string): void {
        myMessage = message;
    }

    @query([MyCanister], MyCanister)
    myQuery(param: MyCanister): MyCanister {
        return param;
    }

    @query([], IDL.Text)
    getMessage(): string {
        return myMessage;
    }
}
