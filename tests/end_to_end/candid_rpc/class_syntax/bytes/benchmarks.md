# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_924_365    | 1_359_746  | $0.0000018080 | $1.80             |
| 1   | getBytes    | 2_554_842    | 1_611_936  | $0.0000021433 | $2.14             |
| 2   | getBytes    | 9_459_743    | 4_373_897  | $0.0000058158 | $5.81             |
| 3   | getBytes    | 77_857_903   | 31_733_161 | $0.0000421946 | $42.19            |
| 4   | getBytes    | 153_853_726  | 62_131_490 | $0.0000826144 | $82.61            |

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
