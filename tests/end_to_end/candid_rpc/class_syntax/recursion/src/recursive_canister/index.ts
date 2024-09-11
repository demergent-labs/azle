import { IDL, init, query } from 'azle';

import { MyCanister } from './types';

export default class {
    myMessage = '';

    @init([IDL.Text])
    init(message: string): void {
        this.myMessage = message;
    }

    @query([MyCanister], MyCanister)
    myQuery(param: MyCanister): MyCanister {
        return param;
    }

    @query([], IDL.Text)
    getMessage(): string {
        return this.myMessage;
    }
}
