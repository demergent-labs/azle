# Benchmarks for calc

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | add         | 1_368_499    | 1_137_399 | $0.0000015124 | $1.51             | <font color="red">+2_977</font>    |
| 1   | sub         | 1_324_402    | 1_119_760 | $0.0000014889 | $1.48             | <font color="green">-7_523</font>  |
| 2   | mul         | 1_323_238    | 1_119_295 | $0.0000014883 | $1.48             | <font color="green">-8_192</font>  |
| 3   | div         | 1_674_081    | 1_259_632 | $0.0000016749 | $1.67             | <font color="green">-10_720</font> |
| 4   | clearall    | 948_041      | 969_216   | $0.0000012887 | $1.28             | <font color="green">-7_903</font>  |
| 5   | add         | 1_318_085    | 1_117_234 | $0.0000014856 | $1.48             | <font color="green">-10_009</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_365_522    | 1_136_208 | $0.0000015108 | $1.51             |
| 1   | sub         | 1_331_925    | 1_122_770 | $0.0000014929 | $1.49             |
| 2   | mul         | 1_331_430    | 1_122_572 | $0.0000014927 | $1.49             |
| 3   | div         | 1_684_801    | 1_263_920 | $0.0000016806 | $1.68             |
| 4   | clearall    | 955_944      | 972_377   | $0.0000012929 | $1.29             |
| 5   | add         | 1_328_094    | 1_121_237 | $0.0000014909 | $1.49             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
