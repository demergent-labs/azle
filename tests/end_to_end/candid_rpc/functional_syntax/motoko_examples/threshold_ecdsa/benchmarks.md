# Benchmarks for threshold_ecdsa

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | publicKey   | 148_453_485  | 59_971_394 | $0.0000797422 | $79.74            | <font color="red">+30_387</font> |
| 1   | sign        | 148_643_576  | 60_047_430 | $0.0000798433 | $79.84            | <font color="red">+83_143</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | publicKey   | 148_423_098  | 59_959_239 | $0.0000797260 | $79.72            |
| 1   | sign        | 148_560_433  | 60_014_173 | $0.0000797990 | $79.79            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
