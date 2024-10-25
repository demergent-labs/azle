# Benchmarks for cycles

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_513_497    | 1_195_398 | $0.0000015895 | $1.58             |
| 1   | receiveCycles | 1_504_413    | 1_191_765 | $0.0000015847 | $1.58             |
| 2   | receiveCycles | 1_506_270    | 1_192_508 | $0.0000015856 | $1.58             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_733_766    | 1_283_506 | $0.0000017066 | $1.70             |
| 1   | sendCyclesNotify | 1_996_355    | 1_388_542 | $0.0000018463 | $1.84             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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
