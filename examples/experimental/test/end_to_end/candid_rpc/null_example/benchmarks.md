⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for null_example

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | setPartiallyNullRecord | 8_983_835    | 4_183_534 | $0.0000055627 | $5.56             | <font color="green">-10_979</font> |
| 1   | setSmallNullRecord     | 5_374_876    | 2_739_950 | $0.0000036432 | $3.64             | <font color="green">-14_564</font> |
| 2   | setLargeNullRecord     | 8_685_211    | 4_064_084 | $0.0000054039 | $5.40             | <font color="green">-20_058</font> |

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
