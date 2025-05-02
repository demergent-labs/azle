import { IDL, update } from 'azle';

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
}
