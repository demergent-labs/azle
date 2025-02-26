# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | count       | 1_128_208    | 1_041_283 | $0.0000013846 | $1.38             | <font color="green">-4_748</font> |
| 1   | count       | 1_098_091    | 1_029_236 | $0.0000013685 | $1.36             | <font color="green">-6_683</font> |
| 2   | reset       | 1_096_961    | 1_028_784 | $0.0000013679 | $1.36             | <font color="green">-8_086</font> |
| 3   | count       | 1_103_128    | 1_031_251 | $0.0000013712 | $1.37             | <font color="green">-8_625</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_132_956    | 1_043_182 | $0.0000013871 | $1.38             |
| 1   | count       | 1_104_774    | 1_031_909 | $0.0000013721 | $1.37             |
| 2   | reset       | 1_105_047    | 1_032_018 | $0.0000013722 | $1.37             |
| 3   | count       | 1_111_753    | 1_034_701 | $0.0000013758 | $1.37             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
