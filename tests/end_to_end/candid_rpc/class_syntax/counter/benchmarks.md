# Benchmarks for counter

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | incrementCount | 1_498_092    | 1_189_236 | $0.0000015813 | $1.58             | <font color="red">+4_206</font>  |
| 1   | incrementCount | 1_471_932    | 1_178_772 | $0.0000015674 | $1.56             | <font color="red">+25_338</font> |
| 2   | incrementCount | 1_467_017    | 1_176_806 | $0.0000015648 | $1.56             | <font color="red">+18_922</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | incrementCount | 1_493_886    | 1_187_554 | $0.0000015791 | $1.57             |
| 1   | incrementCount | 1_446_594    | 1_168_637 | $0.0000015539 | $1.55             |
| 2   | incrementCount | 1_448_095    | 1_169_238 | $0.0000015547 | $1.55             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
