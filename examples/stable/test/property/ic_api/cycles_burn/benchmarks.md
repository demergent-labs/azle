⚠️ **WARNING: Benchmark process failed for version 0.33.0**

# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name           | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | --------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | updateCyclesBurn      | 1_367_031    | 1_136_812 | $0.0000015116 | $1.51             | <font color="green">-481_121</font> |
| 1   | assertCyclesBurnTypes | 1_259_324    | 1_093_729 | $0.0000014543 | $1.45             | <font color="red">+29_631</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name           | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | --------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | updateCyclesBurn      | 1_848_152    | 1_329_260 | $0.0000017675 | $1.76             |
| 1   | assertCyclesBurnTypes | 1_229_693    | 1_081_877 | $0.0000014385 | $1.43             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
