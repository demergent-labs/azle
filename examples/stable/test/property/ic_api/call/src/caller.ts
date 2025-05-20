import { IDL, update } from 'azle';

export default class {
    @update([IDL.Text, IDL.Text], IDL.Text)
    call(methodName: string, param: string): string {
        return `Called ${methodName} with ${param}`;
    }
}
