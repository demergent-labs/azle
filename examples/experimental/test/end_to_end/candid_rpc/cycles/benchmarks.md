⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for cycles

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | receiveCycles | 1_144_098    | 1_047_639 | $0.0000013930 | $1.39             | <font color="green">-668</font>   |
| 1   | receiveCycles | 1_229_078    | 1_081_631 | $0.0000014382 | $1.43             | <font color="green">-1_184</font> |
| 2   | receiveCycles | 1_229_850    | 1_081_940 | $0.0000014386 | $1.43             | <font color="green">-1_831</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_144_766    | 1_047_906 | $0.0000013934 | $1.39             |
| 1   | receiveCycles | 1_230_262    | 1_082_104 | $0.0000014388 | $1.43             |
| 2   | receiveCycles | 1_231_681    | 1_082_672 | $0.0000014396 | $1.43             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                                |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------------- |
| 0   | sendCycles       | 1_400_683    | 1_150_273 | $0.0000015295 | $1.52             | <font color="green">-9_179_719</font> |
| 1   | sendCyclesNotify | 1_719_943    | 1_277_977 | $0.0000016993 | $1.69             | <font color="green">-159</font>       |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 10_580_402   | 4_822_160 | $0.0000064119 | $6.41             |
| 1   | sendCyclesNotify | 1_720_102    | 1_278_040 | $0.0000016994 | $1.69             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
