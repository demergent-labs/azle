# Benchmarks for randomness

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name  | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------ | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade  | 1_336_540_621 | 935_206_248 | $0.0012435157 | $1_243.51         | <font color="red">+316_376_067</font> |
| 1   | randomNumber | 1_063_661     | 1_015_464   | $0.0000013502 | $1.35             | <font color="red">+13_506</font>      |
| 2   | randomNumber | 1_044_502     | 1_007_800   | $0.0000013400 | $1.34             | <font color="red">+15_641</font>      |
| 3   | randomNumber | 1_043_066     | 1_007_226   | $0.0000013393 | $1.33             | <font color="red">+14_205</font>      |
| 4   | randomNumber | 1_045_022     | 1_008_008   | $0.0000013403 | $1.34             | <font color="red">+16_161</font>      |
| 5   | randomNumber | 1_044_296     | 1_007_718   | $0.0000013399 | $1.33             | <font color="red">+15_435</font>      |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name  | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ----------- | ------------- | ----------------- |
| 0   | postUpgrade  | 1_020_164_554 | 808_655_821 | $0.0010752454 | $1_075.24         |
| 1   | randomNumber | 1_050_155     | 1_010_062   | $0.0000013430 | $1.34             |
| 2   | randomNumber | 1_028_861     | 1_001_544   | $0.0000013317 | $1.33             |
| 3   | randomNumber | 1_028_861     | 1_001_544   | $0.0000013317 | $1.33             |
| 4   | randomNumber | 1_028_861     | 1_001_544   | $0.0000013317 | $1.33             |
| 5   | randomNumber | 1_028_861     | 1_001_544   | $0.0000013317 | $1.33             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
