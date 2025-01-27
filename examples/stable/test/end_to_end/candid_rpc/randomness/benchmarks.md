# Benchmarks for randomness

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name  | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                  |
| --- | ------------ | ------------- | ----------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade  | 1_006_963_049 | 803_375_219 | $0.0010682239 | $1_068.22         | <font color="green">-329_573_125</font> |
| 1   | randomNumber | 1_137_492     | 1_044_996   | $0.0000013895 | $1.38             | <font color="red">+74_124</font>        |
| 2   | randomNumber | 1_118_159     | 1_037_263   | $0.0000013792 | $1.37             | <font color="red">+73_950</font>        |
| 3   | randomNumber | 1_120_459     | 1_038_183   | $0.0000013804 | $1.38             | <font color="red">+77_686</font>        |
| 4   | randomNumber | 1_121_773     | 1_038_709   | $0.0000013811 | $1.38             | <font color="red">+77_044</font>        |
| 5   | randomNumber | 1_121_737     | 1_038_694   | $0.0000013811 | $1.38             | <font color="red">+77_734</font>        |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name  | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ----------- | ------------- | ----------------- |
| 0   | postUpgrade  | 1_336_536_174 | 935_204_469 | $0.0012435133 | $1_243.51         |
| 1   | randomNumber | 1_063_368     | 1_015_347   | $0.0000013501 | $1.35             |
| 2   | randomNumber | 1_044_209     | 1_007_683   | $0.0000013399 | $1.33             |
| 3   | randomNumber | 1_042_773     | 1_007_109   | $0.0000013391 | $1.33             |
| 4   | randomNumber | 1_044_729     | 1_007_891   | $0.0000013402 | $1.34             |
| 5   | randomNumber | 1_044_003     | 1_007_601   | $0.0000013398 | $1.33             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
