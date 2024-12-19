# Benchmarks for calc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | add         | 1_265_023    | 1_096_009 | $0.0000014573 | $1.45             | <font color="green">-12_829</font> |
| 1   | sub         | 1_242_735    | 1_087_094 | $0.0000014455 | $1.44             | <font color="red">+8_811</font>    |
| 2   | mul         | 1_241_975    | 1_086_790 | $0.0000014451 | $1.44             | <font color="red">+8_521</font>    |
| 3   | div         | 1_568_985    | 1_217_594 | $0.0000016190 | $1.61             | <font color="red">+2_322</font>    |
| 4   | clearall    | 886_945      | 944_778   | $0.0000012562 | $1.25             | <font color="red">+8_320</font>    |
| 5   | add         | 1_239_273    | 1_085_709 | $0.0000014436 | $1.44             | <font color="red">+8_947</font>    |

## Baseline benchmarks Azle version: 0.25.0-alpha

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

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
