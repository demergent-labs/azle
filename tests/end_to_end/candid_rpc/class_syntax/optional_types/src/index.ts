// TODO let's add more examples here, really test it out

import { IDL, query } from 'azle';

const Element = IDL.Record({
    id: IDL.Text
});
type Element = {
    id: string;
};

const Head = IDL.Record({
    elements: IDL.Vec(Element)
});

const Html = IDL.Record({
    head: IDL.Opt(Head)
});

export default class {
    @query([], Html)
    getHtml() {
        return {
            head: []
        };
    }

    @query([], IDL.Opt(Head))
    getHead() {
        return [
            {
                elements: []
            }
        ];
    }

    @query([], IDL.Opt(Head))
    getHeadWithElements() {
        return [
            {
                elements: [
                    {
                        id: '0'
                    }
                ]
            }
        ];
    }

    @query([IDL.Opt(IDL.Opt(Element))], IDL.Opt(IDL.Opt(Element)))
    getElement(element: [[Element] | []] | []) {
        return element;
    }

    @query([], IDL.Null)
    getNull() {
        return null;
    }

    @query([], IDL.Opt(IDL.Text))
    getOptNull() {
        return [];
    }

    @query([IDL.Opt(IDL.Text)], IDL.Bool)
    stringToBoolean(optString: [string] | []) {
        if (optString.length === 0) {
            return false;
        }
        return true;
    }
}
