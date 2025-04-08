# Benchmarks for null_example

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setPartiallyNullRecord | 8_981_371    | 4_182_548 | $0.0000055614 | $5.56             | <font color="green">-13_443</font> |
| 1   | setSmallNullRecord     | 5_385_685    | 2_744_274 | $0.0000036490 | $3.64             | <font color="green">-3_755</font>  |
| 2   | setLargeNullRecord     | 8_698_331    | 4_069_332 | $0.0000054109 | $5.41             | <font color="green">-6_938</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 8_994_814    | 4_187_925 | $0.0000055686 | $5.56             |
| 1   | setSmallNullRecord     | 5_389_440    | 2_745_776 | $0.0000036510 | $3.65             |
| 2   | setLargeNullRecord     | 8_705_269    | 4_072_107 | $0.0000054146 | $5.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
