# Benchmarks for null_example

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | setPartiallyNullRecord | 8_985_215    | 4_184_086 | $0.0000055635 | $5.56             | <font color="red">+1_380</font>  |
| 1   | setSmallNullRecord     | 5_401_490    | 2_750_596 | $0.0000036574 | $3.65             | <font color="red">+26_614</font> |
| 2   | setLargeNullRecord     | 8_710_787    | 4_074_314 | $0.0000054175 | $5.41             | <font color="red">+25_576</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 8_983_835    | 4_183_534 | $0.0000055627 | $5.56             |
| 1   | setSmallNullRecord     | 5_374_876    | 2_739_950 | $0.0000036432 | $3.64             |
| 2   | setLargeNullRecord     | 8_685_211    | 4_064_084 | $0.0000054039 | $5.40             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
