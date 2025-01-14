# Benchmarks for func_types

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                  |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                             | 1_028_896_713 | 812_148_685 | $0.0010798897 | $1_079.88         | <font color="green">-331_474_101</font> |
| 1   | getNotifierFromNotifiersCanister | 1_825_738     | 1_320_295   | $0.0000017556 | $1.75             | <font color="red">+168_829</font>       |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                             | 1_360_370_814 | 944_738_325 | $0.0012561902 | $1_256.19         |
| 1   | getNotifierFromNotifiersCanister | 1_656_909     | 1_252_763   | $0.0000016658 | $1.66             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
