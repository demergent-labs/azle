# Benchmarks for threshold_ecdsa

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                               |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------ |
| 0   | publicKey   | 159_532_203  | 64_402_881 | $0.0000856346 | $85.63            | <font color="red">+11_141_809</font> |
| 1   | sign        | 159_640_584  | 64_446_233 | $0.0000856922 | $85.69            | <font color="red">+11_092_271</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | publicKey   | 148_390_394  | 59_946_157 | $0.0000797086 | $79.70            |
| 1   | sign        | 148_548_313  | 60_009_325 | $0.0000797926 | $79.79            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
