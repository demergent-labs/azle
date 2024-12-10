# Benchmarks for cert-var

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 1_964_613    | 1_375_845 | $0.0000018294 | $1.82             |
| 1   | inc         | 2_196_133    | 1_468_453 | $0.0000019526 | $1.95             |
| 2   | set         | 1_947_663    | 1_369_065 | $0.0000018204 | $1.82             |
| 3   | inc         | 2_196_132    | 1_468_452 | $0.0000019526 | $1.95             |
| 4   | set         | 1_947_663    | 1_369_065 | $0.0000018204 | $1.82             |
| 5   | inc         | 2_196_132    | 1_468_452 | $0.0000019526 | $1.95             |
| 6   | set         | 1_947_688    | 1_369_075 | $0.0000018204 | $1.82             |
| 7   | inc         | 2_196_132    | 1_468_452 | $0.0000019526 | $1.95             |
| 8   | set         | 1_947_663    | 1_369_065 | $0.0000018204 | $1.82             |
| 9   | inc         | 2_196_133    | 1_468_453 | $0.0000019526 | $1.95             |
| 10  | set         | 1_947_663    | 1_369_065 | $0.0000018204 | $1.82             |
| 11  | inc         | 2_196_132    | 1_468_452 | $0.0000019526 | $1.95             |
| 12  | set         | 1_986_852    | 1_384_740 | $0.0000018412 | $1.84             |

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
