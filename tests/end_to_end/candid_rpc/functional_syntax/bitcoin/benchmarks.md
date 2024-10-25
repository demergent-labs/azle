# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance               | 147_907_952  | 59_753_180 | $0.0000794520 | $79.45            |
| 1   | getUtxos                 | 149_785_488  | 60_504_195 | $0.0000804506 | $80.45            |
| 2   | getCurrentFeePercentiles | 146_145_648  | 59_048_259 | $0.0000785147 | $78.51            |
| 3   | sendTransaction          | 146_652_724  | 59_251_089 | $0.0000787844 | $78.78            |
| 4   | getCurrentFeePercentiles | 146_224_879  | 59_079_951 | $0.0000785568 | $78.55            |

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
