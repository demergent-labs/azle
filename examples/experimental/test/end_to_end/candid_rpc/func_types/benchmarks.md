# Benchmarks for func_types

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                             | 4_897_127_274 | 3_559_440_909 | $0.0047328818 | $4_732.88         | <font color="red">+36_278_894</font> |
| 1   | getNotifierFromNotifiersCanister | 10_518_057    | 4_797_222     | $0.0000063787 | $6.37             | <font color="red">+9_094_902</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                             | 4_860_848_380 | 3_544_929_352 | $0.0047135862 | $4_713.58         |
| 1   | getNotifierFromNotifiersCanister | 1_423_155     | 1_159_262     | $0.0000015414 | $1.54             |

# Benchmarks for notifiers

## Current benchmarks Azle version: 0.31.0

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
