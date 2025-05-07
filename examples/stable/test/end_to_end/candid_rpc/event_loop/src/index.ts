import { chunk, IDL, query, update } from 'azle';

export default class {
    @update([], IDL.Vec(IDL.Nat32))
    testOrdering0(): number[] {
        let ordering: number[] = [];

        try {
            ordering.push(0);

            Promise.reject(null).catch(() => ordering.push(2));
            Promise.resolve()
                .then(() => ordering.push(3))
                .catch(() => {});
            new Promise<void>((_, reject) => reject()).catch(() =>
                ordering.push(4)
            );
            Promise.resolve().then(() => ordering.push(5));
            Promise.reject('err').catch(() => ordering.push(6));
        } finally {
            ordering.push(1);
        }

        return ordering;
    }

    @query([], IDL.Vec(IDL.Nat32))
    async testOrdering1(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await Promise.reject('e').catch(() => ordering.push(1));
        await Promise.resolve().then(() => ordering.push(2));
        await Promise.reject('e').catch(() => ordering.push(3));
        await Promise.resolve().then(() => ordering.push(4));
        await Promise.reject('e').catch(() => ordering.push(5));

        ordering.push(6);
        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering2(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        try {
            await Promise.resolve();
            ordering.push(1);
            await Promise.resolve().then(() => ordering.push(2));
        } catch {
            /* no‑op */
        }

        Promise.reject('e').catch(() => ordering.push(3));
        Promise.resolve().then(() => ordering.push(4));
        Promise.reject('e').catch(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    @query([], IDL.Vec(IDL.Nat32))
    async testOrdering3(): Promise<number[]> {
        let ordering: number[] = [];

        try {
            ordering.push(0);

            Promise.resolve()
                .then(() => {
                    ordering.push(2);
                    return Promise.reject('err');
                })
                .catch(() => ordering.push(3));

            ordering.push(1);

            await Promise.resolve();
            await Promise.resolve();
            await Promise.resolve();
            await Promise.resolve().then(() => ordering.push(4));

            Promise.reject('oops').catch(() => ordering.push(6));
        } finally {
            ordering.push(5);
        }

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering4(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);
        ordering.push(1);

        await Promise.all([
            Promise.resolve().then(() => ordering.push(2)),
            Promise.reject('x').catch(() => ordering.push(3))
        ]);

        Promise.reject('y').catch(() => ordering.push(4));
        Promise.resolve().then(() => ordering.push(5));
        Promise.reject('z').catch(() => ordering.push(6));

        return ordering;
    }

    @query([], IDL.Vec(IDL.Nat32))
    async testOrdering5(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        for (let i = 1; i <= 5; i++) {
            await new Promise<void>((resolve, reject) =>
                i % 2 === 0 ? reject() : resolve()
            )
                .then(() => ordering.push(i))
                .catch(() => ordering.push(i));
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

        try {
            await chunk();
        } finally {
            ordering.push(4);
        }

        Promise.reject('e').catch(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    @query([], IDL.Vec(IDL.Nat32))
    async testOrdering7(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);
        ordering.push(1);

        const p2 = Promise.resolve().then(() => ordering.push(2));
        const p3 = Promise.resolve()
            .then(() => ordering.push(3))
            .catch(() => {});

        try {
            await Promise.race([p2, p3]);
        } catch {
            /* ignored */
        }

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
            try {
                await Promise.reject('boom');
            } catch {
                ordering.push(2);
            }
            ordering.push(3);
        })();

        ordering.push(4);
        Promise.resolve().then(() => ordering.push(5));
        Promise.reject('err').catch(() => ordering.push(6));

        return ordering;
    }

    @query([], IDL.Vec(IDL.Nat32))
    async testOrdering9(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        Promise.resolve().then(() => ordering.push(2));
        Promise.resolve().then(() => ordering.push(3));

        ordering.push(1);

        await Promise.resolve();
        ordering.push(4);

        await Promise.reject('oops').catch(() => {});
        ordering.push(5);

        Promise.reject('final').catch(() => ordering.push(6));
        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering10(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        Promise.resolve()
            .then(() => ordering.push(2))
            .then(() => {
                throw new Error('mid');
            })
            .catch(() => ordering.push(3))
            .then(() => ordering.push(4))
            .then(() => ordering.push(5));

        ordering.push(1);

        try {
            await chunk();
        } finally {
            ordering.push(6);
        }

        return ordering;
    }

    @query([], IDL.Vec(IDL.Nat32))
    async testOrdering11(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        Promise.resolve()
            .then(() => ordering.push(1))
            .then(() => {
                throw new Error('break');
            })
            .catch(() => ordering.push(2))
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
            .then(() => Promise.reject('err'))
            .catch(() => ordering.push(4))
            .then(() => ordering.push(5))
            .then(() => ordering.push(6));

        await Promise.resolve();
        ordering.push(2);

        Promise.reject('late').catch(() => ordering.push(3));

        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering13(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await chunk();
        ordering.push(1);
        Promise.reject('a').catch(() => ordering.push(2));

        await chunk();
        ordering.push(3);
        await Promise.resolve().then(() => ordering.push(4));

        try {
            await chunk();
        } finally {
            ordering.push(5);
        }

        Promise.resolve().then(() => ordering.push(6));
        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering14(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await chunk();
        ordering.push(1);

        await chunk().catch(() => {});
        ordering.push(2);

        await chunk();
        ordering.push(3);

        await chunk().catch(() => {});
        ordering.push(4);

        await chunk();
        ordering.push(5);

        Promise.reject('x').catch(() => ordering.push(6));
        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering15(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        try {
            await chunk();
        } finally {
            ordering.push(1);
        }

        Promise.reject('p').catch(() => ordering.push(2));

        await chunk();
        ordering.push(3);

        await Promise.resolve().then(() => ordering.push(4));

        await chunk();
        ordering.push(5);

        Promise.resolve().then(() => ordering.push(6));
        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering16(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        await chunk();
        ordering.push(1);
        Promise.resolve().then(() => ordering.push(2));

        try {
            await chunk();
        } finally {
            ordering.push(3);
        }

        await Promise.resolve().then(() => ordering.push(4));

        await chunk();
        ordering.push(5);

        Promise.reject('fin').catch(() => ordering.push(6));
        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering17(): Promise<number[]> {
        let ordering: number[] = [];

        ordering.push(0);

        const sequence = (async (): Promise<void> => {
            await chunk();
            ordering.push(2);

            await chunk().catch(() => {});
            ordering.push(3);
        })();

        ordering.push(1);

        await sequence;
        ordering.push(4);

        await chunk();
        ordering.push(5);

        Promise.resolve().then(() => ordering.push(6));
        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering18(): Promise<number[]> {
        let ordering: number[] = [];
        ordering.push(0);

        try {
            await chunk();
            ordering.push(1);
            await Promise.reject('oops').catch(() => ordering.push(2));
        } finally {
            ordering.push(3);
            await chunk();
            ordering.push(4);
        }

        ordering.push(5);
        Promise.reject('final').catch(() => ordering.push(6));
        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering19(): Promise<number[]> {
        let ordering: number[] = [];
        ordering.push(0);

        for (const n of [1, 2, 3]) {
            Promise.resolve().then(() => ordering.push(n));
        }

        await chunk();
        ordering.push(4);

        await Promise.reject('x').catch(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));
        return ordering;
    }

    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering20(): Promise<number[]> {
        let ordering: number[] = [];
        ordering.push(0);

        const p1 = (async (): Promise<void> => {
            await chunk();
            ordering.push(2);
        })();

        const p2 = p1
            .then(async () => {
                await chunk();
                ordering.push(3);
            })
            .catch(() => {});

        ordering.push(1);

        await p2;
        ordering.push(4);

        try {
            await chunk();
        } finally {
            ordering.push(5);
        }

        Promise.reject('zzz').catch(() => ordering.push(6));
        return ordering;
    }
}
