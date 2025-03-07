# Benchmarks for threshold_ecdsa

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | publicKey   | 158_822_768  | 64_119_107 | $0.0000852573 | $85.25            | <font color="red">+33_387</font>   |
| 1   | sign        | 158_937_452  | 64_164_980 | $0.0000853182 | $85.31            | <font color="green">-74_980</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | publicKey   | 158_789_381  | 64_105_752 | $0.0000852395 | $85.23            |
| 1   | sign        | 159_012_432  | 64_194_972 | $0.0000853581 | $85.35            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
