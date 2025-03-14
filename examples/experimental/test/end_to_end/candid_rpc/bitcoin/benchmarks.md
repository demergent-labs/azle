⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | getBalance               | 158_540_900  | 64_006_360 | $0.0000851073 | $85.10            | <font color="red">+1_726</font>   |
| 1   | getUtxos                 | 160_425_637  | 64_760_254 | $0.0000861098 | $86.10            | <font color="red">+19_280</font>  |
| 2   | getCurrentFeePercentiles | 156_788_118  | 63_305_247 | $0.0000841751 | $84.17            | <font color="red">+64_882</font>  |
| 3   | sendTransaction          | 157_285_502  | 63_504_200 | $0.0000844396 | $84.43            | <font color="red">+71_094</font>  |
| 4   | getCurrentFeePercentiles | 156_758_177  | 63_293_270 | $0.0000841592 | $84.15            | <font color="green">-8_031</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance               | 158_539_174  | 64_005_669 | $0.0000851064 | $85.10            |
| 1   | getUtxos                 | 160_406_357  | 64_752_542 | $0.0000860995 | $86.09            |
| 2   | getCurrentFeePercentiles | 156_723_236  | 63_279_294 | $0.0000841406 | $84.14            |
| 3   | sendTransaction          | 157_214_408  | 63_475_763 | $0.0000844018 | $84.40            |
| 4   | getCurrentFeePercentiles | 156_766_208  | 63_296_483 | $0.0000841634 | $84.16            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
