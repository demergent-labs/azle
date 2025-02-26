# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getBalance               | 9_155_736    | 4_252_294 | $0.0000056541 | $5.65             | <font color="green">-27_967</font> |
| 1   | getUtxos                 | 11_258_270   | 5_093_308 | $0.0000067724 | $6.77             | <font color="green">-57_341</font> |
| 2   | getCurrentFeePercentiles | 5_465_299    | 2_776_119 | $0.0000036913 | $3.69             | <font color="red">+18_346</font>   |
| 3   | sendTransaction          | 7_090_150    | 3_426_060 | $0.0000045555 | $4.55             | <font color="red">+8_627</font>    |
| 4   | getCurrentFeePercentiles | 5_418_032    | 2_757_212 | $0.0000036662 | $3.66             | <font color="green">-38_972</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | getBalance               | 9_183_703    | 4_263_481 | $0.0000056690 | $5.66             |
| 1   | getUtxos                 | 11_315_611   | 5_116_244 | $0.0000068029 | $6.80             |
| 2   | getCurrentFeePercentiles | 5_446_953    | 2_768_781 | $0.0000036816 | $3.68             |
| 3   | sendTransaction          | 7_081_523    | 3_422_609 | $0.0000045509 | $4.55             |
| 4   | getCurrentFeePercentiles | 5_457_004    | 2_772_801 | $0.0000036869 | $3.68             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
