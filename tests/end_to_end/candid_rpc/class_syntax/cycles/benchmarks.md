# Benchmarks for cycles

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_522_184    | 1_198_873 | $0.0000015941 | $1.59             |
| 1   | receiveCycles | 1_515_199    | 1_196_079 | $0.0000015904 | $1.59             |
| 2   | receiveCycles | 1_516_303    | 1_196_521 | $0.0000015910 | $1.59             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 1_731_011    | 1_282_404 | $0.0000017052 | $1.70             |
| 1   | sendCyclesNotify | 1_990_804    | 1_386_321 | $0.0000018433 | $1.84             |

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
