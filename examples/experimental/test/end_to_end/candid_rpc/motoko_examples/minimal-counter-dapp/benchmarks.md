# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | count       | 1_132_956    | 1_043_182 | $0.0000013871 | $1.38             | <font color="red">+9_119</font> |
| 1   | count       | 1_104_774    | 1_031_909 | $0.0000013721 | $1.37             | <font color="red">+5_116</font> |
| 2   | reset       | 1_105_047    | 1_032_018 | $0.0000013722 | $1.37             | <font color="red">+6_847</font> |
| 3   | count       | 1_111_753    | 1_034_701 | $0.0000013758 | $1.37             | <font color="red">+7_914</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_123_837    | 1_039_534 | $0.0000013822 | $1.38             |
| 1   | count       | 1_099_658    | 1_029_863 | $0.0000013694 | $1.36             |
| 2   | reset       | 1_098_200    | 1_029_280 | $0.0000013686 | $1.36             |
| 3   | count       | 1_103_839    | 1_031_535 | $0.0000013716 | $1.37             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
