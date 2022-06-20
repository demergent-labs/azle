// @ts-nocheck

// TODO I just want to test every way to reference variants and records

type User = {
    id: string;
    children: Child[];
    yes: Yes;
};

type Child = {
    id: string;
};

type Yes = Variant<{
    One?: null;
    Two?: null;
    Three?: null;
}>;

type Reaction = Variant<{
    Fire?: null;
    Great?: null;
    Good?: Good;
    Fun?: Fun;
}>;

type Good = {
    id: string;
};

type Fun = Variant<{
    id?: null;
}>;
