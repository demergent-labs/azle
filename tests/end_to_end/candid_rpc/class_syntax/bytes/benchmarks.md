# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_924_677    | 1_359_870  | $0.0000018082 | $1.80             |
| 1   | getBytes    | 2_554_628    | 1_611_851  | $0.0000021432 | $2.14             |
| 2   | getBytes    | 9_459_529    | 4_373_811  | $0.0000058157 | $5.81             |
| 3   | getBytes    | 77_857_689   | 31_733_075 | $0.0000421945 | $42.19            |
| 4   | getBytes    | 153_853_512  | 62_131_404 | $0.0000826143 | $82.61            |

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
