⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for threshold_ecdsa

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | publicKey   | 9_323_171    | 4_319_268 | $0.0000057432 | $5.74             | <font color="red">+50_718</font> |
| 1   | sign        | 9_416_263    | 4_356_505 | $0.0000057927 | $5.79             | <font color="red">+43_783</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | publicKey   | 9_272_453    | 4_298_981 | $0.0000057162 | $5.71             |
| 1   | sign        | 9_372_480    | 4_338_992 | $0.0000057694 | $5.76             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
