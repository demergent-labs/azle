# Benchmarks for randomness

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name  | Instructions | Cycles      | USD           | USD/Million Calls | Change                            |
| --- | ------------ | ------------ | ----------- | ------------- | ----------------- | --------------------------------- |
| 0   | postUpgrade  | 985_885_208  | 394_944_083 | $0.0005251453 | $525.14           | <font color="red">+10_632</font>  |
| 1   | randomNumber | 1_128_616    | 1_041_446   | $0.0000013848 | $1.38             | <font color="red">+5_635</font>   |
| 2   | randomNumber | 1_101_174    | 1_030_469   | $0.0000013702 | $1.37             | <font color="red">+314</font>     |
| 3   | randomNumber | 1_103_184    | 1_031_273   | $0.0000013713 | $1.37             | <font color="green">-1_514</font> |
| 4   | randomNumber | 1_099_563    | 1_029_825   | $0.0000013693 | $1.36             | <font color="green">-2_354</font> |
| 5   | randomNumber | 1_103_546    | 1_031_418   | $0.0000013714 | $1.37             | <font color="red">+1_516</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name  | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ------------ | ------------ | ----------- | ------------- | ----------------- |
| 0   | postUpgrade  | 985_874_576  | 394_939_830 | $0.0005251396 | $525.13           |
| 1   | randomNumber | 1_122_981    | 1_039_192   | $0.0000013818 | $1.38             |
| 2   | randomNumber | 1_100_860    | 1_030_344   | $0.0000013700 | $1.37             |
| 3   | randomNumber | 1_104_698    | 1_031_879   | $0.0000013721 | $1.37             |
| 4   | randomNumber | 1_101_917    | 1_030_766   | $0.0000013706 | $1.37             |
| 5   | randomNumber | 1_102_030    | 1_030_812   | $0.0000013706 | $1.37             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
