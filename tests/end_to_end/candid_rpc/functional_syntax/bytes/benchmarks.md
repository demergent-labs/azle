# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.24.2-rc.85

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_985_471    | 1_384_188  | $0.0000018405 | $1.84             |
| 1   | getBytes    | 2_657_960    | 1_653_184  | $0.0000021982 | $2.19             |
| 2   | getBytes    | 9_736_693    | 4_484_677  | $0.0000059631 | $5.96             |
| 3   | getBytes    | 79_943_223   | 32_567_289 | $0.0000433037 | $43.30            |
| 4   | getBytes    | 157_932_452  | 63_762_980 | $0.0000847837 | $84.78            |

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
