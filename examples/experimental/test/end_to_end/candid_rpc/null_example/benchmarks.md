# Benchmarks for null_example

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | setPartiallyNullRecord | 8_994_814    | 4_187_925 | $0.0000055686 | $5.56             | <font color="red">+16_365</font> |
| 1   | setSmallNullRecord     | 5_389_440    | 2_745_776 | $0.0000036510 | $3.65             | <font color="red">+5_976</font>  |
| 2   | setLargeNullRecord     | 8_705_269    | 4_072_107 | $0.0000054146 | $5.41             | <font color="red">+9_921</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 8_978_449    | 4_181_379 | $0.0000055599 | $5.55             |
| 1   | setSmallNullRecord     | 5_383_464    | 2_743_385 | $0.0000036478 | $3.64             |
| 2   | setLargeNullRecord     | 8_695_348    | 4_068_139 | $0.0000054093 | $5.40             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
