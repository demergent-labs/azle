import { IDL, Principal, update } from 'azle';

const Reaction = IDL.Variant({
    Bad: IDL.Null,
    Good: IDL.Null,
    ThumbsUp: IDL.Nat32,
    Tip: IDL.Principal
});
type Reaction =
    | { Bad: null }
    | { Good: null }
    | { ThumbsUp: number }
    | { Tip: Principal };

let variantInitHeapStorage: { [key: string]: Reaction | undefined } = {};

export class VariantBenchmarks {
    @update([IDL.Nat32])
    variantInitStack(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            let _value: Reaction =
                i % 2 === 0
                    ? {
                          ThumbsUp: 2
                      }
                    : {
                          Good: null
                      };
            i += 1;
        }
    }

    @update([IDL.Nat32])
    variantInitHeap(numInits: number): void {
        let i = 0;

        while (i < numInits) {
            variantInitHeapStorage[`element${i}`] =
                i % 2 === 0
                    ? {
                          ThumbsUp: 2
                      }
                    : {
                          Good: null
                      };
            i += 1;
        }
    }
}
