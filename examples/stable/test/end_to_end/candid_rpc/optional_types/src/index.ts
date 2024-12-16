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
type Head = {
    elements: Element[];
};

const Html = IDL.Record({
    head: IDL.Opt(Head)
});
type Html = {
    head: [Head] | [];
};

export default class {
    @query([], Html)
    getHtml(): Html {
        return {
            head: []
        };
    }

    @query([], IDL.Opt(Head))
    getHead(): [Head] | [] {
        return [
            {
                elements: []
            }
        ];
    }

    @query([], IDL.Opt(Head))
    getHeadWithElements(): [Head] | [] {
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
    getElement(element: [[Element] | []] | []): [[Element] | []] | [] {
        return element;
    }

    @query([], IDL.Null)
    getNull(): null {
        return null;
    }

    @query([], IDL.Opt(IDL.Text))
    getOptNull(): [string] | [] {
        return [];
    }

    @query([IDL.Opt(IDL.Text)], IDL.Bool)
    stringToBoolean(optString: [string] | []): boolean {
        if (optString.length === 0) {
            return false;
        }
        return true;
    }
}
