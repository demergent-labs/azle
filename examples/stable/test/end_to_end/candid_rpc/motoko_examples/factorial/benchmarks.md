# Benchmarks for factorial

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | fac         | 1_337_382    | 1_124_952 | $0.0000014958 | $1.49             | <font color="red">+6_527</font>  |
| 1   | fac         | 1_317_213    | 1_116_885 | $0.0000014851 | $1.48             | <font color="red">+5_881</font>  |
| 2   | fac         | 1_796_978    | 1_308_791 | $0.0000017403 | $1.74             | <font color="red">+7_158</font>  |
| 3   | fac         | 3_082_586    | 1_823_034 | $0.0000024240 | $2.42             | <font color="red">+2_209</font>  |
| 4   | fac         | 5_699_156    | 2_869_662 | $0.0000038157 | $3.81             | <font color="red">+13_089</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_330_855    | 1_122_342 | $0.0000014923 | $1.49             |
| 1   | fac         | 1_311_332    | 1_114_532 | $0.0000014820 | $1.48             |
| 2   | fac         | 1_789_820    | 1_305_928 | $0.0000017365 | $1.73             |
| 3   | fac         | 3_080_377    | 1_822_150 | $0.0000024229 | $2.42             |
| 4   | fac         | 5_686_067    | 2_864_426 | $0.0000038087 | $3.80             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
