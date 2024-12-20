# Benchmarks for randomness

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name  | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------ | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade  | 1_336_536_174 | 935_204_469 | $0.0012435133 | $1_243.51         | <font color="red">+316_371_620</font> |
| 1   | randomNumber | 1_063_368     | 1_015_347   | $0.0000013501 | $1.35             | <font color="red">+13_213</font>      |
| 2   | randomNumber | 1_044_209     | 1_007_683   | $0.0000013399 | $1.33             | <font color="red">+15_348</font>      |
| 3   | randomNumber | 1_042_773     | 1_007_109   | $0.0000013391 | $1.33             | <font color="red">+13_912</font>      |
| 4   | randomNumber | 1_044_729     | 1_007_891   | $0.0000013402 | $1.34             | <font color="red">+15_868</font>      |
| 5   | randomNumber | 1_044_003     | 1_007_601   | $0.0000013398 | $1.33             | <font color="red">+15_142</font>      |

## Baseline benchmarks Azle version: 0.25.0-alpha

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

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
