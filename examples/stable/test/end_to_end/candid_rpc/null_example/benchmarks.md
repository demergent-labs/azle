# Benchmarks for null_example

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | setPartiallyNullRecord | 6_000_487    | 2_990_194 | $0.0000039760 | $3.97             | <font color="red">+5_992</font> |
| 1   | setSmallNullRecord     | 4_348_136    | 2_329_254 | $0.0000030971 | $3.09             | <font color="red">+118</font>   |
| 2   | setLargeNullRecord     | 5_668_098    | 2_857_239 | $0.0000037992 | $3.79             | <font color="red">+5_162</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name            | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | setPartiallyNullRecord | 5_994_495    | 2_987_798 | $0.0000039728 | $3.97             |
| 1   | setSmallNullRecord     | 4_348_018    | 2_329_207 | $0.0000030971 | $3.09             |
| 2   | setLargeNullRecord     | 5_662_936    | 2_855_174 | $0.0000037964 | $3.79             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
