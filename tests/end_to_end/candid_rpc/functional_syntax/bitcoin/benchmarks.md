# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance               | 148_056_266  | 59_812_506 | $0.0000795309 | $79.53            |
| 1   | getUtxos                 | 149_946_631  | 60_568_652 | $0.0000805363 | $80.53            |
| 2   | getCurrentFeePercentiles | 146_147_861  | 59_049_144 | $0.0000785159 | $78.51            |
| 3   | sendTransaction          | 146_797_223  | 59_308_889 | $0.0000788613 | $78.86            |
| 4   | getCurrentFeePercentiles | 146_229_397  | 59_081_758 | $0.0000785592 | $78.55            |

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
