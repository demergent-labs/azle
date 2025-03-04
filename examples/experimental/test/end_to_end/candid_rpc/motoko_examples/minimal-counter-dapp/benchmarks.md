# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | count       | 1_129_314    | 1_041_725 | $0.0000013852 | $1.38             | <font color="red">+1_106</font> |
| 1   | count       | 1_098_863    | 1_029_545 | $0.0000013690 | $1.36             | <font color="red">+772</font>   |
| 2   | reset       | 1_098_134    | 1_029_253 | $0.0000013686 | $1.36             | <font color="red">+1_173</font> |
| 3   | count       | 1_104_509    | 1_031_803 | $0.0000013720 | $1.37             | <font color="red">+1_381</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_128_208    | 1_041_283 | $0.0000013846 | $1.38             |
| 1   | count       | 1_098_091    | 1_029_236 | $0.0000013685 | $1.36             |
| 2   | reset       | 1_096_961    | 1_028_784 | $0.0000013679 | $1.36             |
| 3   | count       | 1_103_128    | 1_031_251 | $0.0000013712 | $1.37             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
