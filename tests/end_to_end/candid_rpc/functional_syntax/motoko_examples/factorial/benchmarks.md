# Benchmarks for factorial

## Current benchmarks Azle version: 0.24.2-rc.85

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_260_371    | 1_094_148 | $0.0000014549 | $1.45             |
| 1   | fac         | 1_258_412    | 1_093_364 | $0.0000014538 | $1.45             |
| 2   | fac         | 1_724_041    | 1_279_616 | $0.0000017015 | $1.70             |
| 3   | fac         | 2_973_529    | 1_779_411 | $0.0000023660 | $2.36             |
| 4   | fac         | 5_494_020    | 2_787_608 | $0.0000037066 | $3.70             |

## Baseline benchmarks Azle version: 0.24.2-rc.85

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
