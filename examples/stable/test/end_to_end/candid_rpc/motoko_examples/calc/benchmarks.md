⚠️ **WARNING: Benchmark process failed for version 0.33.0**

# Benchmarks for calc

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | add         | 1_359_588    | 1_133_835 | $0.0000015076 | $1.50             | <font color="red">+179</font>   |
| 1   | sub         | 1_316_986    | 1_116_794 | $0.0000014850 | $1.48             | <font color="red">+325</font>   |
| 2   | mul         | 1_318_285    | 1_117_314 | $0.0000014857 | $1.48             | <font color="red">+911</font>   |
| 3   | div         | 1_665_211    | 1_256_084 | $0.0000016702 | $1.67             | <font color="red">+2_870</font> |
| 4   | clearall    | 945_226      | 968_090   | $0.0000012872 | $1.28             | <font color="red">+4_115</font> |
| 5   | add         | 1_313_613    | 1_115_445 | $0.0000014832 | $1.48             | <font color="red">+1_657</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add         | 1_359_409    | 1_133_763 | $0.0000015075 | $1.50             |
| 1   | sub         | 1_316_661    | 1_116_664 | $0.0000014848 | $1.48             |
| 2   | mul         | 1_317_374    | 1_116_949 | $0.0000014852 | $1.48             |
| 3   | div         | 1_662_341    | 1_254_936 | $0.0000016687 | $1.66             |
| 4   | clearall    | 941_111      | 966_444   | $0.0000012851 | $1.28             |
| 5   | add         | 1_311_956    | 1_114_782 | $0.0000014823 | $1.48             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
