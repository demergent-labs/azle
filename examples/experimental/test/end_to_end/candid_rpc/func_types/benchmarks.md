# Benchmarks for func_types

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                             | 4_855_760_318 | 3_542_894_127 | $0.0047108800 | $4_710.88         | <font color="green">-1_985_564</font> |
| 1   | getNotifierFromNotifiersCanister | 10_528_235    | 4_801_294     | $0.0000063841 | $6.38             | <font color="green">-122_162</font>   |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                             | 4_857_745_882 | 3_543_688_352 | $0.0047119361 | $4_711.93         |
| 1   | getNotifierFromNotifiersCanister | 10_650_397    | 4_850_158     | $0.0000064491 | $6.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
