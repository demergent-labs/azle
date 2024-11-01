# Benchmarks for superheroes

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 3_585_243    | 2_024_097 | $0.0000026914 | $2.69             |
| 1   | create      | 4_575_788    | 2_420_315 | $0.0000032182 | $3.21             |
| 2   | update      | 4_886_185    | 2_544_474 | $0.0000033833 | $3.38             |
| 3   | update      | 3_458_693    | 1_973_477 | $0.0000026241 | $2.62             |
| 4   | deleteHero  | 1_188_328    | 1_065_331 | $0.0000014165 | $1.41             |
| 5   | deleteHero  | 1_178_075    | 1_061_230 | $0.0000014111 | $1.41             |

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
