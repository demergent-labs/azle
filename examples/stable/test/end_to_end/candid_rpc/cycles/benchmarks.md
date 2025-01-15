# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | receiveCycles | 1_623_150    | 1_239_260 | $0.0000016478 | $1.64             | <font color="red">+106_216</font> |
| 1   | receiveCycles | 1_631_239    | 1_242_495 | $0.0000016521 | $1.65             | <font color="red">+111_447</font> |
| 2   | receiveCycles | 1_629_734    | 1_241_893 | $0.0000016513 | $1.65             | <font color="red">+107_353</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_516_934    | 1_196_773 | $0.0000015913 | $1.59             |
| 1   | receiveCycles | 1_519_792    | 1_197_916 | $0.0000015928 | $1.59             |
| 2   | receiveCycles | 1_522_381    | 1_198_952 | $0.0000015942 | $1.59             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | sendCycles       | 1_866_564    | 1_336_625 | $0.0000017773 | $1.77             | <font color="red">+159_853</font> |
| 1   | sendCyclesNotify | 2_190_101    | 1_466_040 | $0.0000019493 | $1.94             | <font color="red">+165_818</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_706_711    | 1_272_684 | $0.0000016922 | $1.69             |
| 1   | sendCyclesNotify | 2_024_283    | 1_399_713 | $0.0000018612 | $1.86             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
