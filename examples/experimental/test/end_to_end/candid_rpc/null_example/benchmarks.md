# Benchmarks for null_example

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | setPartiallyNullRecord | 8_999_049    | 4_189_619 | $0.0000055708 | $5.57             | <font color="red">+16_624</font> |
| 1   | setSmallNullRecord     | 5_393_482    | 2_747_392 | $0.0000036531 | $3.65             | <font color="red">+18_430</font> |
| 2   | setLargeNullRecord     | 8_722_502    | 4_079_000 | $0.0000054237 | $5.42             | <font color="red">+19_081</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 8_982_425    | 4_182_970 | $0.0000055620 | $5.56             |
| 1   | setSmallNullRecord     | 5_375_052    | 2_740_020 | $0.0000036433 | $3.64             |
| 2   | setLargeNullRecord     | 8_703_421    | 4_071_368 | $0.0000054136 | $5.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
