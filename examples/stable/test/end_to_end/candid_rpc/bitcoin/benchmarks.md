# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | getBalance               | 9_183_703    | 4_263_481 | $0.0000056690 | $5.66             |
| 1   | getUtxos                 | 11_315_611   | 5_116_244 | $0.0000068029 | $6.80             |
| 2   | getCurrentFeePercentiles | 5_446_953    | 2_768_781 | $0.0000036816 | $3.68             |
| 3   | sendTransaction          | 7_081_523    | 3_422_609 | $0.0000045509 | $4.55             |
| 4   | getCurrentFeePercentiles | 5_457_004    | 2_772_801 | $0.0000036869 | $3.68             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
