# Benchmarks for threshold_ecdsa

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | publicKey   | 9_368_114    | 4_337_245 | $0.0000057671 | $5.76             | <font color="red">+639_436</font> |
| 1   | sign        | 9_505_810    | 4_392_324 | $0.0000058403 | $5.84             | <font color="red">+590_471</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | publicKey   | 8_728_678    | 4_081_471 | $0.0000054270 | $5.42             |
| 1   | sign        | 8_915_339    | 4_156_135 | $0.0000055263 | $5.52             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
