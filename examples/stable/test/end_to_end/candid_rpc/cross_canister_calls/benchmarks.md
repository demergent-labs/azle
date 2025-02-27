# Benchmarks for canister1

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | balance          | 2_461_243    | 1_574_497 | $0.0000020936 | $2.09             | <font color="green">-19_003</font> |
| 1   | account          | 3_829_786    | 2_121_914 | $0.0000028214 | $2.82             | <font color="green">-19_982</font> |
| 2   | balance          | 2_389_662    | 1_545_864 | $0.0000020555 | $2.05             | <font color="green">-15_403</font> |
| 3   | account          | 3_808_855    | 2_113_542 | $0.0000028103 | $2.81             | <font color="green">-25_941</font> |
| 4   | accounts         | 1_295_984    | 1_108_393 | $0.0000014738 | $1.47             | <font color="green">-8_721</font>  |
| 5   | transfer         | 3_796_130    | 2_108_452 | $0.0000028035 | $2.80             | <font color="green">-22_228</font> |
| 6   | balance          | 2_391_063    | 1_546_425 | $0.0000020562 | $2.05             | <font color="green">-13_357</font> |
| 7   | account          | 3_812_198    | 2_114_879 | $0.0000028121 | $2.81             | <font color="green">-24_832</font> |
| 8   | balance          | 2_393_634    | 1_547_453 | $0.0000020576 | $2.05             | <font color="green">-8_804</font>  |
| 9   | account          | 3_815_554    | 2_116_221 | $0.0000028139 | $2.81             | <font color="green">-15_856</font> |
| 10  | accounts         | 1_296_196    | 1_108_478 | $0.0000014739 | $1.47             | <font color="green">-10_599</font> |
| 11  | trap             | 1_280_113    | 1_102_045 | $0.0000014654 | $1.46             | <font color="green">-12_874</font> |
| 12  | sendNotification | 2_910_789    | 1_754_315 | $0.0000023327 | $2.33             | <font color="green">-20_680</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_480_246    | 1_582_098 | $0.0000021037 | $2.10             |
| 1   | account          | 3_849_768    | 2_129_907 | $0.0000028321 | $2.83             |
| 2   | balance          | 2_405_065    | 1_552_026 | $0.0000020637 | $2.06             |
| 3   | account          | 3_834_796    | 2_123_918 | $0.0000028241 | $2.82             |
| 4   | accounts         | 1_304_705    | 1_111_882 | $0.0000014784 | $1.47             |
| 5   | transfer         | 3_818_358    | 2_117_343 | $0.0000028154 | $2.81             |
| 6   | balance          | 2_404_420    | 1_551_768 | $0.0000020633 | $2.06             |
| 7   | account          | 3_837_030    | 2_124_812 | $0.0000028253 | $2.82             |
| 8   | balance          | 2_402_438    | 1_550_975 | $0.0000020623 | $2.06             |
| 9   | account          | 3_831_410    | 2_122_564 | $0.0000028223 | $2.82             |
| 10  | accounts         | 1_306_795    | 1_112_718 | $0.0000014795 | $1.47             |
| 11  | trap             | 1_292_987    | 1_107_194 | $0.0000014722 | $1.47             |
| 12  | sendNotification | 2_931_469    | 1_762_587 | $0.0000023437 | $2.34             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | transfer            | 2_310_516    | 1_514_206 | $0.0000020134 | $2.01             | <font color="green">-8_212</font>  |
| 1   | receiveNotification | 1_504_966    | 1_191_986 | $0.0000015849 | $1.58             | <font color="green">-14_575</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_318_728    | 1_517_491 | $0.0000020178 | $2.01             |
| 1   | receiveNotification | 1_519_541    | 1_197_816 | $0.0000015927 | $1.59             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
