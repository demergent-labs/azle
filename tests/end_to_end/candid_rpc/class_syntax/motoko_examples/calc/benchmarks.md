# Benchmarks for calc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | add         | 1_291_708    | 1_106_683 | $0.0000014715 | $1.47             | <font color="red">+13_856</font> |
| 1   | sub         | 1_260_182    | 1_094_072 | $0.0000014548 | $1.45             | <font color="red">+26_258</font> |
| 2   | mul         | 1_259_543    | 1_093_817 | $0.0000014544 | $1.45             | <font color="red">+26_089</font> |
| 3   | div         | 1_587_038    | 1_224_815 | $0.0000016286 | $1.62             | <font color="red">+20_375</font> |
| 4   | clearall    | 902_316      | 950_926   | $0.0000012644 | $1.26             | <font color="red">+23_691</font> |
| 5   | add         | 1_256_516    | 1_092_606 | $0.0000014528 | $1.45             | <font color="red">+26_190</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_277_852    | 1_101_140 | $0.0000014642 | $1.46             |
| 1   | sub         | 1_233_924    | 1_083_569 | $0.0000014408 | $1.44             |
| 2   | mul         | 1_233_454    | 1_083_381 | $0.0000014405 | $1.44             |
| 3   | div         | 1_566_663    | 1_216_665 | $0.0000016178 | $1.61             |
| 4   | clearall    | 878_625      | 941_450   | $0.0000012518 | $1.25             |
| 5   | add         | 1_230_326    | 1_082_130 | $0.0000014389 | $1.43             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
