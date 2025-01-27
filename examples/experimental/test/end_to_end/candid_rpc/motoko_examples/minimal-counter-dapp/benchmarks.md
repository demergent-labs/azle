# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | count       | 1_121_349    | 1_038_539 | $0.0000013809 | $1.38             | <font color="green">-1_915</font> |
| 1   | count       | 1_101_931    | 1_030_772 | $0.0000013706 | $1.37             | <font color="red">+9_068</font>   |
| 2   | reset       | 1_100_777    | 1_030_310 | $0.0000013700 | $1.36             | <font color="red">+7_590</font>   |
| 3   | count       | 1_108_618    | 1_033_447 | $0.0000013741 | $1.37             | <font color="red">+9_547</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_123_264    | 1_039_305 | $0.0000013819 | $1.38             |
| 1   | count       | 1_092_863    | 1_027_145 | $0.0000013658 | $1.36             |
| 2   | reset       | 1_093_187    | 1_027_274 | $0.0000013659 | $1.36             |
| 3   | count       | 1_099_071    | 1_029_628 | $0.0000013691 | $1.36             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
