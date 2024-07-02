import { IDL, init, Principal, query } from 'azle';

let myMessage = '';

export const MyCanister = IDL.Rec();
MyCanister.fill(IDL.Service({ myQuery: IDL.Func([MyCanister], [MyCanister]) }));
export type MyCanister = Principal;

export default class {
    @init([IDL.Text])
    init(message: string) {
        myMessage = message;
    }

    @query([], MyCanister)
    myQuery(param: MyCanister) {
        return param;
    }

    @query([], IDL.Text)
    getMessage() {
        return myMessage;
    }
}
