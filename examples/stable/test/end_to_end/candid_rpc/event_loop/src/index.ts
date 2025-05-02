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

    // ────────────────────────────────────────────────────────────────
    // mix of awaited & un‑awaited promises
    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering2(): Promise<number[]> {
        const ordering: number[] = [];

        ordering.push(0);

        // give the event‑loop one clean micro‑task turn
        await Promise.resolve();

        ordering.push(1);

        // guarantee 2 happens before any later micro‑tasks
        await Promise.resolve().then(() => ordering.push(2));

        // schedule the rest without awaiting – they drain in order
        Promise.resolve().then(() => ordering.push(3));
        Promise.resolve().then(() => ordering.push(4));
        Promise.resolve().then(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    // ────────────────────────────────────────────────────────────────
    // nested micro‑tasks + post‑flush work
    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering3(): Promise<number[]> {
        const ordering: number[] = [];

        ordering.push(0);

        // nested promise queues 2, then 3 in the same micro‑task flush
        Promise.resolve().then(() => {
            ordering.push(2);
            return Promise.resolve().then(() => ordering.push(3));
        });

        ordering.push(1);

        // allow the nested jobs above to complete
        await Promise.resolve();

        await Promise.resolve().then(() => ordering.push(4));

        // final un‑awaited micro‑task
        Promise.resolve().then(() => ordering.push(6));

        ordering.push(5);

        return ordering;
    }

    // ────────────────────────────────────────────────────────────────
    // fan‑out with Promise.all, then more queued work
    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering4(): Promise<number[]> {
        const ordering: number[] = [];

        ordering.push(0);
        ordering.push(1);

        // 2 and 3 complete in the same turn
        await Promise.all([
            Promise.resolve().then(() => ordering.push(2)),
            Promise.resolve().then(() => ordering.push(3))
        ]);

        // remaining tasks drain after the method’s return
        Promise.resolve().then(() => ordering.push(4));
        Promise.resolve().then(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    // ────────────────────────────────────────────────────────────────
    // five explicit “ticks” to prove sequential flushing
    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering5(): Promise<number[]> {
        const ordering: number[] = [];

        ordering.push(0);

        for (let i = 1; i <= 5; i++) {
            await Promise.resolve().then(() => ordering.push(i));
        }

        ordering.push(6);

        return ordering;
    }

    // ────────────────────────────────────────────────────────────────
    // macro‑task gap with `await chunk()` + later micro‑tasks
    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering6(): Promise<number[]> {
        const ordering: number[] = [];

        ordering.push(0);
        ordering.push(1);

        // enqueue micro‑tasks 2 & 3 before the macro‑task break
        Promise.resolve().then(() => ordering.push(2));
        Promise.resolve().then(() => ordering.push(3));

        // yields to a new macro‑task (simulated inter‑canister call)
        await chunk();

        // resume in next macro‑task
        ordering.push(4);

        // final micro‑tasks
        Promise.resolve().then(() => ordering.push(5));
        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    // ────────────────────────────────────────────────────────────────
    // Promise.race + Promise.all interplay
    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering7(): Promise<number[]> {
        const ordering: number[] = [];

        ordering.push(0);
        ordering.push(1);

        const p2 = Promise.resolve().then(() => ordering.push(2));
        const p3 = Promise.resolve().then(() => ordering.push(3));

        await Promise.race([p2, p3]); // returns after first micro‑task turn

        ordering.push(4);

        await Promise.all([p2, p3]); // both already resolved

        ordering.push(5);

        await Promise.resolve(); // one more micro‑task “tick”

        ordering.push(6);

        return ordering;
    }

    // ────────────────────────────────────────────────────────────────
    // async IIFE with nested await
    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering8(): Promise<number[]> {
        const ordering: number[] = [];

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

    // ────────────────────────────────────────────────────────────────
    // `queueMicrotask` and staggered awaits
    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering9(): Promise<number[]> {
        const ordering: number[] = [];

        ordering.push(0);

        queueMicrotask(() => ordering.push(2));
        queueMicrotask(() => ordering.push(3));

        ordering.push(1);

        await Promise.resolve(); // flushes 2 & 3

        ordering.push(4);

        await Promise.resolve(); // another micro‑task turn

        ordering.push(5);

        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }

    // ────────────────────────────────────────────────────────────────
    // long `.then` chain demonstrating micro‑task sequencing
    @update([], IDL.Vec(IDL.Nat32))
    async testOrdering10(): Promise<number[]> {
        const ordering: number[] = [];

        ordering.push(0);

        Promise.resolve()
            .then(() => ordering.push(1))
            .then(() => ordering.push(2))
            .then(() => ordering.push(3))
            .then(() => ordering.push(4));

        await Promise.resolve(); // after chain drains

        ordering.push(5);

        Promise.resolve().then(() => ordering.push(6));

        return ordering;
    }
}
