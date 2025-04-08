# Benchmarks for calc

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | add         | 1_361_861    | 1_134_744 | $0.0000015088 | $1.50             | <font color="red">+286</font>   |
| 1   | sub         | 1_316_627    | 1_116_650 | $0.0000014848 | $1.48             | <font color="green">-29</font>  |
| 2   | mul         | 1_314_281    | 1_115_712 | $0.0000014835 | $1.48             | <font color="red">+2_069</font> |
| 3   | div         | 1_660_636    | 1_254_254 | $0.0000016677 | $1.66             | <font color="green">-149</font> |
| 4   | clearall    | 941_943      | 966_777   | $0.0000012855 | $1.28             | <font color="red">+816</font>   |
| 5   | add         | 1_312_036    | 1_114_814 | $0.0000014823 | $1.48             | <font color="red">+2_432</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_361_575    | 1_134_630 | $0.0000015087 | $1.50             |
| 1   | sub         | 1_316_656    | 1_116_662 | $0.0000014848 | $1.48             |
| 2   | mul         | 1_312_212    | 1_114_884 | $0.0000014824 | $1.48             |
| 3   | div         | 1_660_785    | 1_254_314 | $0.0000016678 | $1.66             |
| 4   | clearall    | 941_127      | 966_450   | $0.0000012851 | $1.28             |
| 5   | add         | 1_309_604    | 1_113_841 | $0.0000014810 | $1.48             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
