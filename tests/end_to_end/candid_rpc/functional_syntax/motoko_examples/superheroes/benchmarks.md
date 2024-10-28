# Benchmarks for superheroes

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 4_464_905    | 2_375_962 | $0.0000031592 | $3.15             |
| 1   | create      | 5_764_754    | 2_895_901 | $0.0000038506 | $3.85             |
| 2   | update      | 6_186_476    | 3_064_590 | $0.0000040749 | $4.07             |
| 3   | update      | 4_382_000    | 2_342_800 | $0.0000031152 | $3.11             |
| 4   | deleteHero  | 1_218_121    | 1_077_248 | $0.0000014324 | $1.43             |
| 5   | deleteHero  | 1_206_778    | 1_072_711 | $0.0000014264 | $1.42             |

## Baseline benchmarks Azle version: 0.24.2-rc.88

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
