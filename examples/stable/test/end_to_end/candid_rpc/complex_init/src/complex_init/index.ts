import { IDL, init, msgArgData, query } from 'azle';

const User = IDL.Record({
    id: IDL.Text
});
type User = { id: string };

export default class {
    greeting = 'Hello User';
    user: [User] | [] = [];

    @init([IDL.Tuple(IDL.Text, User)], { manual: true })
    init(): void {
        const tuple = IDL.decode(
            [IDL.Tuple(IDL.Text, User)],
            msgArgData()
        )[0] as [string, User];

        this.greeting = tuple[0];
        this.user = [tuple[1]];
        return undefined;
    }

    @query([], IDL.Text)
    greetUser(): string {
        return `${this.greeting} ${this.user[0]?.id ?? '??'}`;
    }
}
