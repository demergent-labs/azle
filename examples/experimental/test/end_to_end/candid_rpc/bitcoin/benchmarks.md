# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getBalance               | 158_539_174  | 64_005_669 | $0.0000851064 | $85.10            | <font color="red">+47_767</font>    |
| 1   | getUtxos                 | 160_406_357  | 64_752_542 | $0.0000860995 | $86.09            | <font color="green">-105_773</font> |
| 2   | getCurrentFeePercentiles | 156_723_236  | 63_279_294 | $0.0000841406 | $84.14            | <font color="green">-28_802</font>  |
| 3   | sendTransaction          | 157_214_408  | 63_475_763 | $0.0000844018 | $84.40            | <font color="green">-170_388</font> |
| 4   | getCurrentFeePercentiles | 156_766_208  | 63_296_483 | $0.0000841634 | $84.16            | <font color="green">-90_546</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance               | 158_491_407  | 63_986_562 | $0.0000850810 | $85.08            |
| 1   | getUtxos                 | 160_512_130  | 64_794_852 | $0.0000861558 | $86.15            |
| 2   | getCurrentFeePercentiles | 156_752_038  | 63_290_815 | $0.0000841559 | $84.15            |
| 3   | sendTransaction          | 157_384_796  | 63_543_918 | $0.0000844924 | $84.49            |
| 4   | getCurrentFeePercentiles | 156_856_754  | 63_332_701 | $0.0000842116 | $84.21            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
