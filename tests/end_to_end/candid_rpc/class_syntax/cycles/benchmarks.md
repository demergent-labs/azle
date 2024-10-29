# Benchmarks for cycles

## Current benchmarks Azle version: 0.24.2-rc.93

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_530_766    | 1_202_306 | $0.0000015987 | $1.59             |
| 1   | receiveCycles | 1_515_721    | 1_196_288 | $0.0000015907 | $1.59             |
| 2   | receiveCycles | 1_517_086    | 1_196_834 | $0.0000015914 | $1.59             |

## Baseline benchmarks Azle version: 0.24.2-rc.93

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.24.2-rc.93

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_734_450    | 1_283_780 | $0.0000017070 | $1.70             |
| 1   | sendCyclesNotify | 1_997_534    | 1_389_013 | $0.0000018469 | $1.84             |

## Baseline benchmarks Azle version: 0.24.2-rc.93

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
