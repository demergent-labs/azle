import { IDL, query, trap } from 'azle';

export default class {
    @query([IDL.Text], IDL.Empty)
    testTrap(message: string): never {
        trap(message);
    }
}
