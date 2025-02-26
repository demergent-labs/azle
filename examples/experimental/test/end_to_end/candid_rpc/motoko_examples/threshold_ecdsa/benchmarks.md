# Benchmarks for threshold_ecdsa

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | publicKey   | 157_808_613  | 63_713_445 | $0.0000847179 | $84.71            | <font color="green">-1_743_421</font> |
| 1   | sign        | 157_945_525  | 63_768_210 | $0.0000847907 | $84.79            | <font color="green">-1_641_485</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | publicKey   | 159_552_034  | 64_410_813 | $0.0000856451 | $85.64            |
| 1   | sign        | 159_587_010  | 64_424_804 | $0.0000856637 | $85.66            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
