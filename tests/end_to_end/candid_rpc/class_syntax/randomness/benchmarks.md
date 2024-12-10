# Benchmarks for randomness

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name  | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------ | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade  | 1_345_875_738 | 938_940_295 | $0.0012484807 | $1_248.48         | <font color="red">+325_711_184</font> |
| 1   | randomNumber | 1_060_044     | 1_014_017   | $0.0000013483 | $1.34             | <font color="red">+9_889</font>       |
| 2   | randomNumber | 1_045_768     | 1_008_307   | $0.0000013407 | $1.34             | <font color="red">+16_907</font>      |
| 3   | randomNumber | 1_045_767     | 1_008_306   | $0.0000013407 | $1.34             | <font color="red">+16_906</font>      |
| 4   | randomNumber | 1_045_767     | 1_008_306   | $0.0000013407 | $1.34             | <font color="red">+16_906</font>      |
| 5   | randomNumber | 1_045_767     | 1_008_306   | $0.0000013407 | $1.34             | <font color="red">+16_906</font>      |

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
