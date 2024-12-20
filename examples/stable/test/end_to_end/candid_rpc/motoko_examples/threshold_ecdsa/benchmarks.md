# Benchmarks for threshold_ecdsa

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | publicKey   | 8_728_678    | 4_081_471 | $0.0000054270 | $5.42             | <font color="green">-148_141</font> |
| 1   | sign        | 8_915_339    | 4_156_135 | $0.0000055263 | $5.52             | <font color="green">-45_915</font>  |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | publicKey   | 8_876_819    | 4_140_727 | $0.0000055058 | $5.50             |
| 1   | sign        | 8_961_254    | 4_174_501 | $0.0000055507 | $5.55             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
