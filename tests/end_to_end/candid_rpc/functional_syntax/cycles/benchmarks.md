# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_132_884    | 1_043_153 | $0.0000013870 | $1.38             |
| 1   | receiveCycles | 1_227_872    | 1_081_148 | $0.0000014376 | $1.43             |
| 2   | receiveCycles | 1_227_921    | 1_081_168 | $0.0000014376 | $1.43             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init             | 5_369_444_849 | 4_148_367_939 | $0.0055159604 | $5_515.96         |
| 1   | sendCycles       | 11_204_565    | 5_071_826     | $0.0000067439 | $6.74             |
| 2   | sendCyclesNotify | 1_414_305     | 1_155_722     | $0.0000015367 | $1.53             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
