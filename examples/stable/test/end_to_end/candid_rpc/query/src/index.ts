import { IDL, query } from 'azle';

const coolThing = IDL.Record({
    'field.*?+\\': IDL.Text,
    'field.*?+': IDL.Text
});

type coolThing = {
    'field.*?+\\': string;
    'field.*?+': string;
};

export default class {
    @query([], IDL.Text)
    simpleQuery(): string {
        return 'This is a query function';
    }

    @query([], undefined, { hidden: false })
    'q\\\\u"""oted\\Q"ue\\ry'(): void {
        console.log('This is a query function');
    }

    @query([], undefined, { hidden: false })
    'quoted"Query'(): void {
        console.log('This is a query function');
    }

    @query([], undefined, { hidden: false })
    'crazyQuery.*?+^${}()|[]!~`;,='(): void {
        console.log('This is a query function');
    }

    @query([], coolThing)
    coolQuery(): coolThing {
        return {
            'field.*?+\\': 'value',
            'field.*?+': 'value'
        };
    }
}
