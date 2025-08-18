⚠️ **WARNING: Benchmark process failed for version 0.33.0**

# Benchmarks for counter

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | incrementCount | 1_602_351    | 1_230_940 | $0.0000016367 | $1.63             | <font color="green">-592</font> |
| 1   | incrementCount | 1_550_717    | 1_210_286 | $0.0000016093 | $1.60             | <font color="red">+1_244</font> |
| 2   | incrementCount | 1_553_753    | 1_211_501 | $0.0000016109 | $1.61             | <font color="red">+2_142</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | incrementCount | 1_602_943    | 1_231_177 | $0.0000016371 | $1.63             |
| 1   | incrementCount | 1_549_473    | 1_209_789 | $0.0000016086 | $1.60             |
| 2   | incrementCount | 1_551_611    | 1_210_644 | $0.0000016098 | $1.60             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
