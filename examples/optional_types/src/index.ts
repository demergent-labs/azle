// TODO let's add more examples here, really test it out

import {
    Opt,
    query,
    Record,
    Vec,
    text,
    bool,
    candid,
    record,
    Null
} from 'azle';

@record
class Element extends Record {
    @candid(text)
    id: string;
}

@record
class Head extends Record {
    @candid(Vec(Element))
    elements: Vec<Element>;
}

@record
class Html extends Record {
    @candid(Opt(Head))
    head: Opt<Head>;
}

export default class {
    @query([], Html)
    getHtml(): Html {
        return {
            head: []
        };
    }

    @query([], Opt(Head))
    getHead(): Opt<Head> {
        return [
            new Head({
                elements: []
            })
        ];
    }

    @query([], Opt(Head))
    getHeadWithElements(): Opt<Head> {
        return [
            new Head({
                elements: [
                    {
                        id: '0'
                    }
                ]
            })
        ];
    }

    @query([Opt(Opt(Element))], Opt(Opt(Element)))
    getElement(element: Opt<Opt<Element>>): Opt<Opt<Element>> {
        return element;
    }

    @query([], Null)
    getNull(): Null {
        return null;
    }

    @query([], Opt(text))
    getOptNull(): Opt<string> {
        return [];
    }

    @query([Opt(text)], bool)
    stringToBoolean(optString: Opt<string>): boolean {
        if (optString.length > 0) {
            return true;
        }
        return false;
    }
}
