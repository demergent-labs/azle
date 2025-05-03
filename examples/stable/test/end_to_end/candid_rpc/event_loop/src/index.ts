import { chunk, IDL, update } from 'azle';

export default class {
    @update([], IDL.Vec(IDL.Nat32))
    testOrdering0(): number[] {
        let ordering: number[] = [];

        ordering.push(0);

        new Promise<void>((resolve) => resolve()).then(() => ordering.push(2));
        new Promise<void>((resolve) => resolve()).then(() => ordering.push(3));
        new Promise<void>((resolve) => resolve()).then(() => ordering.push(4));
        new Promise<void>((resolve) => resolve()).then(() => ordering.push(5));
        new Promise<void>((resolve) => resolve()).then(() => ordering.push(6));

        ordering.push(1);

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering1(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await new Promise<void>((resolve) => resolve()).then(() =>
            ordering.push(1)
        );
        await new Promise<void>((resolve) => resolve()).then(() =>
            ordering.push(2)
        );
        await new Promise<void>((resolve) => resolve()).then(() =>
            ordering.push(3)
        );
        await new Promise<void>((resolve) => resolve()).then(() =>
            ordering.push(4)
        );
        await new Promise<void>((resolve) => resolve()).then(() =>
            ordering.push(5)
        );

        ordering.push(6);

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering2(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await Promise.resolve();

        ordering.push(1);

        await Promise.resolve().then(() => ordering.push(2));

        Promise.resolve().then(() => ordering.push(3));
        Promise.resolve().then(() => ordering.push(4));
        Promise.resolve().then(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering3(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        Promise.resolve().then(() => {
            ordering.push(2);
            return Promise.resolve().then(() => ordering.push(3));
        });

        ordering.push(1);

        await Promise.resolve();

        await Promise.resolve().then(() => ordering.push(4));

        Promise.resolve().then(() => ordering.push(6));

        ordering.push(5);

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering4(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);
        ordering.push(1);

        await Promise.all([
            Promise.resolve().then(() => ordering.push(2)),
            Promise.resolve().then(() => ordering.push(3))
        ]);

        Promise.resolve().then(() => ordering.push(4));
        Promise.resolve().then(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering5(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        for (let i = 1; i <= 5; i++) {
            await Promise.resolve().then(() => ordering.push(i));
        }

        ordering.push(6);

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering6(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);
        ordering.push(1);

        Promise.resolve().then(() => ordering.push(2));
        Promise.resolve().then(() => ordering.push(3));

        await chunk();

        ordering.push(4);

        Promise.resolve().then(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering7(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);
        ordering.push(1);

        const p2 = Promise.resolve().then(() => ordering.push(2));
        const p3 = Promise.resolve().then(() => ordering.push(3));

        await Promise.race([p2, p3]);

        ordering.push(4);

        await Promise.all([p2, p3]);

        ordering.push(5);

        await Promise.resolve();

        ordering.push(6);

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering8(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await (async (): Promise<void> => {
            ordering.push(1);
            await Promise.resolve().then(() => ordering.push(2));
            ordering.push(3);
        })();

        ordering.push(4);

        Promise.resolve().then(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering9(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        queueMicrotask(() => ordering.push(2));
        queueMicrotask(() => ordering.push(3));

        ordering.push(1);

        await Promise.resolve();

        ordering.push(4);

        await Promise.resolve();

        ordering.push(5);

        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering10(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        Promise.resolve()
            .then(() => ordering.push(2))
            .then(() => ordering.push(3))
            .then(() => ordering.push(4))
            .then(() => ordering.push(5));

        ordering.push(1);

        await chunk();

        ordering.push(6);

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering11(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        Promise.resolve()
            .then(() => ordering.push(1))
            .then(() => ordering.push(2))
            .then(() => ordering.push(3))
            .then(() => ordering.push(4))
            .then(() => ordering.push(5))
            .then(() => ordering.push(6));

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering12(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        Promise.resolve()
            .then(() => ordering.push(1))
            .then(() => ordering.push(3))
            .then(() => ordering.push(5))
            .then(() => ordering.push(6));

        await Promise.resolve();

        ordering.push(2);

        Promise.resolve().then(() => {
            ordering.push(4);
        });

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering13(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await chunk();

        ordering.push(1);

        Promise.resolve().then(() => ordering.push(2));

        await chunk();

        ordering.push(3);

        await Promise.resolve().then(() => ordering.push(4));

        await chunk();

        ordering.push(5);

        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering14(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await chunk();
        ordering.push(1);

        await chunk();
        ordering.push(2);

        await chunk();
        ordering.push(3);

        await chunk();
        ordering.push(4);

        await chunk();
        ordering.push(5);

        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering15(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await chunk();
        ordering.push(1);

        Promise.resolve().then(() => ordering.push(2));

        await chunk();
        ordering.push(3);

        await Promise.resolve().then(() => ordering.push(4));

        await chunk();
        ordering.push(5);

        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }
}
