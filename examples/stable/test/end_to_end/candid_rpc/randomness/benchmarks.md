# Benchmarks for randomness

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name  | Instructions | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ------------ | ------------ | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade  | 991_278_693  | 397_101_477 | $0.0005280139 | $528.01           | <font color="red">+5_404_117</font> |
| 1   | randomNumber | 1_127_985    | 1_041_194   | $0.0000013844 | $1.38             | <font color="red">+5_004</font>     |
| 2   | randomNumber | 1_104_717    | 1_031_886   | $0.0000013721 | $1.37             | <font color="red">+3_857</font>     |
| 3   | randomNumber | 1_101_542    | 1_030_616   | $0.0000013704 | $1.37             | <font color="green">-3_156</font>   |
| 4   | randomNumber | 1_104_141    | 1_031_656   | $0.0000013718 | $1.37             | <font color="red">+2_224</font>     |
| 5   | randomNumber | 1_105_564    | 1_032_225   | $0.0000013725 | $1.37             | <font color="red">+3_534</font>     |

## Baseline benchmarks Azle version: 0.29.0

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
