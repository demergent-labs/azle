# Benchmarks for func_types

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                             | 1_011_438_855 | 805_165_542 | $0.0010706045 | $1_070.60         | <font color="green">-5_193_096</font> |
| 1   | getNotifierFromNotifiersCanister | 1_302_969     | 1_111_187   | $0.0000014775 | $1.47             | <font color="green">-8_783</font>     |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                             | 1_016_631_951 | 807_242_780 | $0.0010733665 | $1_073.36         |
| 1   | getNotifierFromNotifiersCanister | 1_311_752     | 1_114_700   | $0.0000014822 | $1.48             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
