# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name | Instructions | Cycles    | USD           |
| --------- | ----------- | ------------ | --------- | ------------- |
| 0         | 1           | 2,295,649    | 1,508,259 | $0.0000020160 |
| 1         | 2           | 3,635,548    | 2,044,219 | $0.0000027323 |
| 2         | 1           | 2,217,855    | 1,477,142 | $0.0000019744 |
| 3         | 2           | 3,616,570    | 2,036,628 | $0.0000027222 |
| 4         | 3           | 1,650,431    | 1,250,172 | $0.0000016710 |
| 5         | 0           | 3,563,895    | 2,015,558 | $0.0000026940 |
| 6         | 1           | 2,209,388    | 1,473,755 | $0.0000019698 |
| 7         | 2           | 3,611,711    | 2,034,684 | $0.0000027196 |
| 8         | 1           | 2,209,377    | 1,473,750 | $0.0000019698 |
| 9         | 2           | 3,608,226    | 2,033,290 | $0.0000027177 |
| 10        | 3           | 1,650,308    | 1,250,123 | $0.0000016709 |
| 11        | 4           | 1,618,944    | 1,237,577 | $0.0000016542 |
| 12        | 5           | 2,648,631    | 1,649,452 | $0.0000022047 |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name | Instructions | Cycles    | USD           |
| --------- | ----------- | ------------ | --------- | ------------- |
| 0         | 0           | 2,171,301    | 1,458,520 | $0.0000019495 |
| 1         | 5           | 1,383,650    | 1,143,460 | $0.0000015284 |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
