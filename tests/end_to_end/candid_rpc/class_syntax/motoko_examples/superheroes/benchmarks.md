# Benchmarks for superheroes

## Current benchmarks Azle version: 0.24.2-rc.92

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 3_584_681    | 2_023_872 | $0.0000026911 | $2.69             |
| 1   | create      | 4_571_881    | 2_418_752 | $0.0000032161 | $3.21             |
| 2   | update      | 4_888_547    | 2_545_418 | $0.0000033846 | $3.38             |
| 3   | update      | 3_460_345    | 1_974_138 | $0.0000026250 | $2.62             |
| 4   | deleteHero  | 1_188_837    | 1_065_534 | $0.0000014168 | $1.41             |
| 5   | deleteHero  | 1_177_583    | 1_061_033 | $0.0000014108 | $1.41             |

## Baseline benchmarks Azle version: 0.24.2-rc.92

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
