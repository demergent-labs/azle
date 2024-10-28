# Benchmarks for factorial

## Current benchmarks Azle version: 0.24.2-rc.87

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_248_185    | 1_089_274 | $0.0000014484 | $1.44             |
| 1   | fac         | 1_226_901    | 1_080_760 | $0.0000014371 | $1.43             |
| 2   | fac         | 1_690_158    | 1_266_063 | $0.0000016834 | $1.68             |
| 3   | fac         | 2_939_046    | 1_765_618 | $0.0000023477 | $2.34             |
| 4   | fac         | 5_478_313    | 2_781_325 | $0.0000036982 | $3.69             |

## Baseline benchmarks Azle version: 0.24.2-rc.87

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
