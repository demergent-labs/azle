# Benchmarks for func_types

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                             | 4_855_712_830 | 3_542_875_132 | $0.0047108548 | $4_710.85         | <font color="green">-47_488</font> |
| 1   | getNotifierFromNotifiersCanister | 10_528_235    | 4_801_294     | $0.0000063841 | $6.38             | <font color="red">0</font>         |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name                      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                             | 4_855_760_318 | 3_542_894_127 | $0.0047108800 | $4_710.88         |
| 1   | getNotifierFromNotifiersCanister | 10_528_235    | 4_801_294     | $0.0000063841 | $6.38             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
