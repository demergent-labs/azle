⚠️ **WARNING: Benchmark process failed for version 0.33.0**

# Benchmarks for func_types

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                             | 1_019_922_176 | 808_558_870 | $0.0010751165 | $1_075.11         | <font color="red">+4_750_183</font> |
| 1   | getNotifierFromNotifiersCanister | 1_286_460     | 1_104_584   | $0.0000014687 | $1.46             | <font color="green">-65_784</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                             | 1_015_171_993 | 806_658_797 | $0.0010725900 | $1_072.59         |
| 1   | getNotifierFromNotifiersCanister | 1_352_244     | 1_130_897   | $0.0000015037 | $1.50             |

# Benchmarks for notifiers

## Current benchmarks Azle version: 0.32.0

No benchmarks reported

## Baseline benchmarks Azle version: 0.30.0

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
