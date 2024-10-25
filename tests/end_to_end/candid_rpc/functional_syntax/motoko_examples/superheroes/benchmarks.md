# Benchmarks for superheroes

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 4_462_185    | 2_374_874 | $0.0000031578 | $3.15             |
| 1   | create      | 5_761_764    | 2_894_705 | $0.0000038490 | $3.84             |
| 2   | update      | 6_194_416    | 3_067_766 | $0.0000040791 | $4.07             |
| 3   | update      | 4_390_051    | 2_346_020 | $0.0000031194 | $3.11             |
| 4   | deleteHero  | 1_220_105    | 1_078_042 | $0.0000014334 | $1.43             |
| 5   | deleteHero  | 1_210_718    | 1_074_287 | $0.0000014284 | $1.42             |

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
